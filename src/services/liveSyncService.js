import { chunkTextContent } from './ingestionEngine';

let lastProcessedText = "";

/**
 * Poll live WhatsApp messages from /api/live-whatsapp API
 */
export async function syncLiveWhatsAppMessages(onNewChunks) {
  try {
    const res = await fetch('/api/live-whatsapp');
    if (!res.ok) return;

    const data = await res.json();
    const rawText = data.text || '';

    if (rawText && rawText !== lastProcessedText) {
      lastProcessedText = rawText;
      const chunks = chunkTextContent(rawText, 'Live WhatsApp Group');
      if (chunks.length > 0 && onNewChunks) {
        onNewChunks(chunks);
      }
    }
  } catch (err) {
    // Quiet polling
  }
}
