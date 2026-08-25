// ECHO Memory Engine - Mock Data & Service Layer
// Designed for seamless migration to Supabase/PostgreSQL backend

export const INITIAL_MEMBERS = [
  {
    id: "rahul",
    name: "Rahul",
    role: "Backend Lead",
    avatar: "R",
    color: "bg-indigo-500/20 text-indigo-300 border-indigo-500/30",
    focus: ["API Development", "Authentication & Auth0/Supabase"],
    commitments: [
      { task: "Complete Backend API", dueDate: "Tuesday", status: "OVERDUE", impact: "High" },
      { task: "Fix Authentication middleware", dueDate: "Thursday night", status: "IN_PROGRESS", impact: "Critical" }
    ],
    blockers: ["Unresolved OAuth session validation in Auth middleware"],
    recentMessages: [
      { id: "m-fri-2", time: "Friday · 11:45 AM", text: "Still working on authentication.", source: "team_chat.txt" },
      { id: "m-fri-1", time: "Friday · 9:15 AM", text: "Debugging JWT token renewal bug right now.", source: "team_chat.txt" },
      { id: "m-thu-2", time: "Thursday · 5:45 PM", text: "I'll fix authentication tonight.", source: "team_chat.txt" },
      { id: "m-wed-1", time: "Wednesday · 11:18 AM", text: "API is blocked by authentication.", source: "team_chat.txt" },
      { id: "m-tue-1", time: "Tuesday · 10:20 AM", text: "Backend is 70% done.", source: "team_chat.txt" },
      { id: "m-mon-1", time: "Monday · 7:42 PM", text: "I'll finish the API tomorrow.", source: "team_chat.txt" }
    ]
  },
  {
    id: "aman",
    name: "Aman",
    role: "Frontend Lead",
    avatar: "A",
    color: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
    focus: ["UI Component Integration", "Ask ECHO Interface"],
    commitments: [
      { task: "Integrate Memory Timeline with API", dueDate: "Friday", status: "BLOCKED", impact: "High" }
    ],
    blockers: ["Waiting on backend API endpoints for live data binding"],
    recentMessages: [
      { id: "m-fri-3", time: "Friday · 11:30 AM", text: "The demo is tomorrow.", source: "team_chat.txt" },
      { id: "m-thu-1", time: "Thursday · 2:10 PM", text: "Frontend integration is waiting on the API.", source: "team_chat.txt" },
      { id: "m-thu-0", time: "Thursday · 11:42 AM", text: "Aman asked about backend API availability.", source: "team_chat.txt" }
    ]
  },
  {
    id: "priya",
    name: "Priya",
    role: "ML & Vector Search",
    avatar: "P",
    color: "bg-purple-500/20 text-purple-300 border-purple-500/30",
    focus: ["Context Embeddings", "Signal Detection Pipeline"],
    commitments: [
      { task: "Fine-tune contradiction classifier", dueDate: "Completed", status: "DONE", impact: "Medium" }
    ],
    blockers: [],
    recentMessages: [
      { id: "m-wed-2", time: "Wednesday · 4:15 PM", text: "Vector index updated with latest 486 messages.", source: "sprint_notes.pdf" }
    ]
  },
  {
    id: "jatin",
    name: "Jatin",
    role: "Product Lead",
    avatar: "J",
    color: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
    focus: ["Sprint Scope & Demo Alignment"],
    commitments: [
      { task: "Prepare Demo Pitch", dueDate: "Saturday", status: "IN_PROGRESS", impact: "High" }
    ],
    blockers: ["Backend authentication unresolved ahead of tomorrow's demo"],
    recentMessages: [
      { id: "m-tue-2", time: "Tuesday · 2:00 PM", text: "Let's make sure backend and frontend hook up before Friday.", source: "sprint_notes.pdf" }
    ]
  }
];

export const INITIAL_SOURCES = [
  {
    id: "src-1",
    name: "team_chat.txt",
    type: "Conversation",
    messagesCount: 486,
    dateAdded: "Aug 24, 2026",
    status: "Processed ✓",
    iconType: "chat",
    size: "1.2 MB"
  },
  {
    id: "src-2",
    name: "sprint_notes.pdf",
    type: "Meeting notes",
    messagesCount: 42,
    dateAdded: "Aug 24, 2026",
    status: "Processed ✓",
    iconType: "document",
    size: "840 KB"
  },
  {
    id: "src-3",
    name: "rahul_voice_note.mp3",
    type: "Voice note",
    messagesCount: 1,
    dateAdded: "Aug 26, 2026",
    status: "Transcribed ✓",
    iconType: "voice",
    duration: "1m 14s",
    transcript: "Hey team, just an update on backend... we ran into a token validation issue with auth. I'm actively working through it."
  },
  {
    id: "src-4",
    name: "architecture_spec.pdf",
    type: "Document",
    messagesCount: 18,
    dateAdded: "Aug 22, 2026",
    status: "Processed ✓",
    iconType: "document",
    size: "3.4 MB"
  },
  {
    id: "src-5",
    name: "demo_checklist.png",
    type: "Images",
    messagesCount: 5,
    dateAdded: "Aug 23, 2026",
    status: "OCR Processed ✓",
    iconType: "image",
    size: "2.1 MB"
  }
];

export const TIMELINE_EVENTS = [
  {
    id: "t-1",
    date: "MON · AUG 24",
    time: "7:42 PM",
    person: "Rahul",
    avatar: "R",
    role: "Backend Lead",
    source: "team_chat.txt",
    sourceType: "Conversation",
    content: "I'll finish the API tomorrow.",
    highlight: "Commitment made: API completion expected Tuesday"
  },
  {
    id: "obs-1",
    type: "ECHO_OBSERVATION",
    title: "ECHO initial baseline",
    description: "Target set for Tuesday API delivery. Frontend work scheduled for Wednesday."
  },
  {
    id: "t-2",
    date: "TUE · AUG 25",
    time: "10:20 AM",
    person: "Rahul",
    avatar: "R",
    role: "Backend Lead",
    source: "team_chat.txt",
    sourceType: "Conversation",
    content: "Backend is 70% done.",
    highlight: "Progress update: API endpoint scaffolding ready"
  },
  {
    id: "t-3",
    date: "WED · AUG 26",
    time: "11:18 AM",
    person: "Rahul",
    avatar: "R",
    role: "Backend Lead",
    source: "team_chat.txt",
    sourceType: "Conversation",
    content: "API is blocked by authentication.",
    highlight: "Blocker introduced: OAuth middleware failure"
  },
  {
    id: "obs-2",
    type: "ECHO_OBSERVATION",
    isWarning: true,
    title: "⚠ ECHO detected a change",
    description: "A planned completion became an unresolved dependency. Original completion commitment passed without delivery."
  },
  {
    id: "t-4",
    date: "THU · AUG 27",
    time: "2:10 PM",
    person: "Aman",
    avatar: "A",
    role: "Frontend Lead",
    source: "team_chat.txt",
    sourceType: "Conversation",
    content: "Frontend integration is waiting on the API.",
    highlight: "Dependency impact: Frontend integration stalled"
  },
  {
    id: "t-5",
    date: "THU · AUG 27",
    time: "5:45 PM",
    person: "Rahul",
    avatar: "R",
    role: "Backend Lead",
    source: "team_chat.txt",
    sourceType: "Conversation",
    content: "I'll fix authentication tonight.",
    highlight: "Re-commitment: Authentication resolution planned overnight"
  },
  {
    id: "obs-3",
    type: "ECHO_OBSERVATION",
    isWarning: true,
    title: "⚠ Critical path alert",
    description: "Authentication is on the critical path for demo readiness. 24 hours remaining before scheduled demo."
  },
  {
    id: "t-6",
    date: "FRI · AUG 28",
    time: "9:15 AM",
    person: "Rahul",
    avatar: "R",
    role: "Backend Lead",
    source: "team_chat.txt",
    sourceType: "Conversation",
    content: "Still working on authentication.",
    highlight: "Blocker persists: Auth session bug remains open"
  },
  {
    id: "t-7",
    date: "FRI · AUG 28",
    time: "11:30 AM",
    person: "Aman",
    avatar: "A",
    role: "Frontend Lead",
    source: "team_chat.txt",
    sourceType: "Conversation",
    content: "The demo is tomorrow.",
    highlight: "Risk realization: Unintegrated backend ahead of Saturday demo"
  }
];

export const SIGNALS_DATA = [
  {
    id: "sig-1",
    category: "Risks",
    severity: "High",
    title: "Backend authentication failure",
    description: "Authentication has remained unresolved across 3 conversations over 48 hours. Frontend integration is blocked.",
    relatedPeople: ["Rahul", "Aman"],
    relatedSources: ["team_chat.txt", "rahul_voice_note.mp3"],
    timestamp: "18 minutes ago"
  },
  {
    id: "sig-2",
    category: "Risks",
    severity: "High",
    title: "Potential demo delay",
    description: "Demo scheduled for Saturday. Core API dependencies remain unintegrated due to authentication blocker.",
    relatedPeople: ["Aman", "Jatin"],
    relatedSources: ["team_chat.txt", "sprint_notes.pdf"],
    timestamp: "1 hour ago"
  },
  {
    id: "sig-3",
    category: "Commitments",
    severity: "Medium",
    title: "Rahul — Complete API",
    description: "Original commitment made Monday 7:42 PM to deliver API on Tuesday. Unfulfilled due to authentication blocker.",
    relatedPeople: ["Rahul"],
    relatedSources: ["team_chat.txt"],
    timestamp: "Expected Aug 25"
  },
  {
    id: "sig-4",
    category: "Dependencies",
    severity: "High",
    title: "Frontend → Backend API → Authentication",
    description: "Aman's frontend integration work is strictly dependent on Rahul delivering the authenticated API endpoints.",
    relatedPeople: ["Aman", "Rahul"],
    relatedSources: ["team_chat.txt", "architecture_spec.pdf"],
    timestamp: "Detected Aug 27"
  },
  {
    id: "sig-5",
    category: "Decisions",
    severity: "Info",
    title: "Supabase selected as authentication backend",
    description: "Decision finalized in sprint kickoff on Monday to use Supabase JWT auth for user session management.",
    relatedPeople: ["Rahul", "Priya"],
    relatedSources: ["sprint_notes.pdf"],
    timestamp: "Aug 24, 2026"
  },
  {
    id: "sig-6",
    category: "Contradictions",
    severity: "Medium",
    title: "Database status discrepancy",
    description: "Status reported as '70% done' on Tuesday morning, but downgraded to total authentication blocker on Wednesday morning.",
    relatedPeople: ["Rahul"],
    relatedSources: ["team_chat.txt"],
    timestamp: "Aug 26, 2026"
  }
];

// Query Matcher & Reasoning Engine
export function queryEchoMemory(question) {
  const q = question.toLowerCase();

  if (q.includes("rahul") || q.includes("backend") || q.includes("deadline") || q.includes("blocking")) {
    return {
      query: question,
      answer: "Rahul initially expected the backend API to be completed Tuesday, but authentication became a blocker on Wednesday and remains unresolved.",
      highlights: ["Tuesday", "authentication", "Wednesday", "unresolved"],
      evidence: [
        {
          speaker: "Rahul",
          avatar: "R",
          role: "Backend Lead",
          timestamp: "Monday · 7:42 PM",
          source: "team_chat.txt",
          sourceType: "Team Chat",
          message: "I'll finish the API tomorrow."
        },
        {
          speaker: "Rahul",
          avatar: "R",
          role: "Backend Lead",
          timestamp: "Wednesday · 11:18 AM",
          source: "team_chat.txt",
          sourceType: "Team Chat",
          message: "API is blocked by authentication."
        },
        {
          speaker: "Aman",
          avatar: "A",
          role: "Frontend Lead",
          timestamp: "Thursday · 2:10 PM",
          source: "team_chat.txt",
          sourceType: "Team Chat",
          message: "Frontend integration is waiting on the API."
        }
      ],
      insight: {
        title: "This looks like a project delay.",
        description: "Rahul's original API commitment was followed by an authentication blocker. Frontend integration is dependent on the API.",
        action: "View timeline →"
      }
    };
  }

  if (q.includes("commit") || q.includes("promised") || q.includes("promise")) {
    return {
      query: question,
      answer: "Rahul committed on Monday evening to complete the API by Tuesday, and subsequently committed on Thursday to resolve authentication overnight.",
      highlights: ["Monday evening", "Tuesday", "Thursday", "overnight"],
      evidence: [
        {
          speaker: "Rahul",
          avatar: "R",
          role: "Backend Lead",
          timestamp: "Monday · 7:42 PM",
          source: "team_chat.txt",
          sourceType: "Team Chat",
          message: "I'll finish the API tomorrow."
        },
        {
          speaker: "Rahul",
          avatar: "R",
          role: "Backend Lead",
          timestamp: "Thursday · 5:45 PM",
          source: "team_chat.txt",
          sourceType: "Team Chat",
          message: "I'll fix authentication tonight."
        }
      ],
      insight: {
        title: "Commitment tracking alert",
        description: "Both commitments encountered delays due to authentication token verification issues.",
        action: "View timeline →"
      }
    };
  }

  if (q.includes("when") || q.includes("first") || q.includes("auth")) {
    return {
      query: question,
      answer: "Authentication was first brought up as a blocker on Wednesday at 11:18 AM by Rahul, after previously reporting 70% progress on Tuesday.",
      highlights: ["Wednesday at 11:18 AM", "70% progress", "Tuesday"],
      evidence: [
        {
          speaker: "Rahul",
          avatar: "R",
          role: "Backend Lead",
          timestamp: "Tuesday · 10:20 AM",
          source: "team_chat.txt",
          sourceType: "Team Chat",
          message: "Backend is 70% done."
        },
        {
          speaker: "Rahul",
          avatar: "R",
          role: "Backend Lead",
          timestamp: "Wednesday · 11:18 AM",
          source: "team_chat.txt",
          sourceType: "Team Chat",
          message: "API is blocked by authentication."
        }
      ],
      insight: {
        title: "Pattern detection",
        description: "Authentication issues surfaced after initial architectural scaffolding was reported complete.",
        action: "View timeline →"
      }
    };
  }

  // Fallback synthesized response for custom questions
  return {
    query: question,
    answer: `Based on 486 messages across Project AURA memory: "${question}" is directly related to Rahul's ongoing backend authentication work and Aman's frontend integration plan.`,
    highlights: ["486 messages", "Project AURA", "authentication", "frontend integration"],
    evidence: [
      {
        speaker: "Rahul",
        avatar: "R",
        role: "Backend Lead",
        timestamp: "Friday · 9:15 AM",
        source: "team_chat.txt",
        sourceType: "Team Chat",
        message: "Still working on authentication."
      },
      {
        speaker: "Aman",
        avatar: "A",
        role: "Frontend Lead",
        timestamp: "Friday · 11:30 AM",
        source: "team_chat.txt",
        sourceType: "Team Chat",
        message: "The demo is tomorrow."
      }
    ],
    insight: {
      title: "Contextual Memory Summary",
      description: "ECHO connected 4 conversations and 2 meeting notes to synthesize this contextual answer.",
      action: "View timeline →"
    }
  };
}
