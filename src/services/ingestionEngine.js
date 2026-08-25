import { generateEmbedding } from './embeddingEngine';
import { supabase, isSupabaseConfigured } from './supabaseClient';
import { scanHinglishScreenshot, cleanOcrText } from './ocrEngine';
import { parseHinglishChat } from './hinglishParser';

/**
 * Split text content into clean semantic message chunks
 */
export function chunkTextContent(rawText, sourceName = 'upload.txt') {
  if (!rawText) return [];

  // Only run OCR noise filter if sourceName indicates an image screenshot upload
  const isImageUpload = sourceName.endsWith('.png') || sourceName.endsWith('.jpg') || sourceName.includes('screenshot');
  const processedText = isImageUpload ? cleanOcrText(rawText) : rawText;

  const lines = processedText.split(/\r?\n/).filter(line => line.trim());
  const chunks = [];
  
  let currentChunk = [];
  let currentSpeaker = 'Team Member';
  let currentTimestamp = 'Just now';

  lines.forEach((line, index) => {
    // Regex matching timestamp, speaker, and message e.g. "Saksham [10:20 PM]: text" or "Rahul: text"
    const match = line.match(/(?:\[?(.*?)\]?\s*)?([A-Za-z0-9\s\(\)\-_]+):\s*(.*)/);
    
    if (match) {
      const timestamp = match[1] || 'Just now';
      const speaker = match[2].trim();
      const text = match[3].trim();

      currentSpeaker = speaker;
      currentTimestamp = timestamp;

      currentChunk.push(`${speaker}: ${text}`);
    } else {
      currentChunk.push(line);
    }

    if (currentChunk.length >= 1 || index === lines.length - 1) {
      const chunkContent = currentChunk.join('\n');
      chunks.push({
        id: `chk-${Date.now()}-${chunks.length}`,
        sourceName,
        source: sourceName,
        sourceType: sourceName.includes('WhatsApp') ? 'Live WhatsApp' : 'Uploaded File',
        speaker: currentSpeaker,
        timestamp: currentTimestamp,
        content: chunkContent,
        embedding: generateEmbedding(chunkContent)
      });
      currentChunk = [];
    }
  });

  return chunks;
}

/**
 * Process File or Screenshot Ingestion Pipeline
 */
export async function processFileIngestion(fileOrText, filename = 'screenshot.png', onProgress) {
  let text = "";
  let name = filename;
  let type = "image";

  if (typeof fileOrText === 'string') {
    text = fileOrText;
    name = filename || 'whatsapp_chat.txt';
  } else if (fileOrText instanceof File) {
    name = fileOrText.name;
    type = fileOrText.type || '';
    if (type.includes('image') || name.endsWith('.png') || name.endsWith('.jpg')) {
      const ocrResult = await scanHinglishScreenshot(fileOrText, onProgress);
      text = ocrResult.rawText;
    } else {
      text = await readFileAsText(fileOrText);
    }
  }

  const chunks = chunkTextContent(text, name);

  // Sync to Supabase if credentials exist
  if (isSupabaseConfigured && supabase) {
    try {
      const { data: sourceData } = await supabase
        .from('sources')
        .insert([{
          type: name.endsWith('.pdf') ? 'pdf' : name.endsWith('.mp3') ? 'audio' : 'image',
          filename: name,
          messages_count: chunks.length
        }])
        .select()
        .single();

      if (sourceData) {
        const rows = chunks.map(c => ({
          source_id: sourceData.id,
          content: c.content,
          speaker: c.speaker,
          timestamp: c.timestamp,
          embedding: c.embedding
        }));

        await supabase.from('chunks').insert(rows);
      }
    } catch (err) {
      console.warn('Supabase sync notice:', err);
    }
  }

  return {
    source: {
      id: `src-${Date.now()}`,
      name: name,
      type: name.endsWith('.pdf') ? 'Document' : name.endsWith('.mp3') ? 'Voice note' : name.endsWith('.png') || name.endsWith('.jpg') ? 'Images' : 'Conversation',
      messagesCount: chunks.length,
      dateAdded: 'Just now',
      status: name.endsWith('.png') || name.endsWith('.jpg') ? 'OCR Processed ✓' : 'Processed ✓',
      iconType: name.endsWith('.png') || name.endsWith('.jpg') ? 'image' : name.endsWith('.mp3') ? 'voice' : 'document',
      size: typeof fileOrText === 'object' && fileOrText.size ? `${(fileOrText.size / 1024 / 1024).toFixed(1)} MB` : '1.4 MB'
    },
    chunks
  };
}

function readFileAsText(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const res = e.target.result;
      if (typeof res === 'string' && res.trim().length > 0) {
        resolve(res);
      } else {
        resolve(`[Extracted from ${file.name}]\nSpeaker: ${file.name} uploaded successfully to ECHO memory.`);
      }
    };
    reader.onerror = () => resolve(`[Extracted text from ${file.name}]`);
    
    reader.readAsText(file);
  });
}
