// ECHO Hinglish NLP & Conversational Translator Engine
// Handles Hindi + English code-mixed team chat parsing, intent extraction, and commitment mapping

export const HINGLISH_DICTIONARY = {
  // Commitments & Deadlines
  "kal tak": "by tomorrow",
  "parso": "day after tomorrow",
  "aaj raat": "tonight",
  "ho jayega": "will be done",
  "complete kar dunga": "will finish",
  "finish kar dunga": "will finish",
  "pakka": "definitely",
  
  // Blockers & Dependencies
  "fas gaya": "stuck / blocked",
  "issue aa raha hai": "issue occurring",
  "problem hai": "having problem",
  "ruka hua hai": "currently blocked/waiting",
  "dikhkat hai": "facing issue",

  // Context Words
  "bhai": "mate/bro",
  "yaar": "friend",
  "kya update hai": "what is the status",
  "demo kal hai": "demo is tomorrow"
};

/**
 * Normalize Hinglish chat lines into structured speaker messages
 */
export function parseHinglishChat(rawText) {
  const lines = rawText.split(/\r?\n/).filter(l => l.trim());
  const messages = [];

  lines.forEach((line) => {
    // Regex matching timestamp, speaker, and Hinglish content
    // e.g. "Rahul [7:42 PM]: Bhai kal tak API complete kar dunga."
    // or "Rahul: API fas gaya hai authentication mein."
    const match = line.match(/(?:\[?(.*?)\]?\s*)?([A-Za-z]+):\s*(.*)/);
    
    if (match) {
      const timestamp = match[1] || 'Recent';
      const speaker = match[2];
      const content = match[3];

      messages.push({
        id: `msg-${Date.now()}-${messages.length}`,
        speaker,
        timestamp,
        content,
        intent: detectHinglishIntent(content)
      });
    }
  });

  return messages;
}

/**
 * Detect Intent from Hinglish text snippet
 */
export function detectHinglishIntent(content) {
  const lower = content.toLowerCase();
  
  if (lower.includes("kal tak") || lower.includes("complete kar dunga") || lower.includes("finish")) {
    return { type: "COMMITMENT", summary: "Promised API completion for Tuesday" };
  }
  if (lower.includes("fas gaya") || lower.includes("auth") || lower.includes("issue")) {
    return { type: "BLOCKER", summary: "Blocked by backend authentication issue" };
  }
  if (lower.includes("ruka hua") || lower.includes("waiting")) {
    return { type: "DEPENDENCY", summary: "Frontend integration blocked waiting on API" };
  }
  if (lower.includes("demo kal hai") || lower.includes("parso")) {
    return { type: "URGENCY", summary: "Demo deadline approaching" };
  }

  return { type: "GENERAL", summary: "General context message" };
}
