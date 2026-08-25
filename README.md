# 🧠 ECHO — AI-Powered Team Memory & Context Graph Engine

> **Built for HackSynapse 2026 by Team ERROR 404**  
> *Transforming fragmented chats, commits, documents, and WhatsApp streams into a unified, queryable intelligence graph.*

---

## ⚡ Overview

**ECHO** is an intelligent team memory engine designed to solve one of the biggest friction points in modern team collaboration: **context fragmentation and lost decisions**.

Instead of searching across scattered WhatsApp chats, Slack channels, meeting notes, and Git commit logs, **ECHO** continuously ingests multimodal communication streams and constructs a **Live Context & Memory Graph**. It proactively flags project health risks, highlights blockers, tracks overdue commitments, and provides an instant **RAG (Retrieval-Augmented Generation)** query interface that understands both **English** and **Hinglish** (Romanized Hindi).

---

## ✨ Key Features

- 🕸️ **Live Interactive Memory Graph**: Visualizes real-time connections between team members, project topics, tasks, and blockers.
- 🚨 **AI Project Health & Blocker Detection**: Proactively detects workflow risks (e.g., *"Backend authentication is blocking frontend integration"*) before they cause sprint delays.
- 💬 **Ask ECHO (Multi-lingual RAG Engine)**: Query your project's entire history in plain English or **Hinglish** (e.g., *"Rahul ka kya status hai?"*, *"Authentication blocker kab resolution stream me jaayega?"*).
- 📲 **Live WhatsApp Chat Synchronization**: Real-time integration powered by `whatsapp-web.js` and custom server middleware to automatically capture and index live chat updates.
- 🖼️ **Client-Side Image OCR**: Ingest screenshots, whiteboards, and text documents directly in the browser via `Tesseract.js`.
- ⏳ **Chronological Context Timeline**: Audit trail tracking project commitments, status changes, and critical decisions.
- 📁 **Multimodal Document Ingestion**: Upload, index, and preview `.txt`, `.json`, `.csv`, and image files with automated vector chunking.
- ⚡ **Interactive Command Palette (`⌘K` / `Ctrl+K`)**: Rapid keyboard navigation and quick context query launcher.
- 🌗 **Light & Dark Theme Support**: Modern, responsive UI designed for maximum readability and high-contrast dark modes.

---

## 🛠️ Technology Stack

| Layer | Technologies Used |
| :--- | :--- |
| **Frontend Framework** | [React 19](https://react.dev/), [Vite 8](https://vite.dev/) |
| **Styling & UI** | [Tailwind CSS v4](https://tailwindcss.com/), [Lucide Icons](https://lucide.dev/), `clsx`, `tailwind-merge` |
| **Database & Cloud** | [Supabase](https://supabase.com/) (PostgreSQL & Vector Store Client) |
| **AI / RAG / NLP** | Custom In-Browser TF-IDF & Cosine Similarity Embedding Engine, Custom Hinglish Parser, RAG Retrieval Pipeline |
| **OCR Processing** | [Tesseract.js](https://tesseract.projectnaptha.com/) (Browser-based Optical Character Recognition) |
| **Bot Automation** | [whatsapp-web.js](https://wwebjs.dev/), `qrcode-terminal` |
| **Code Quality** | [Oxlint](https://oxc.rs/docs/tools/oxlint.html) |

---

## 📂 Project Structure

```text
ERROR 404/
├── public/
│   ├── _redirects              # Cloudflare Pages / SPA redirect rule
│   ├── favicon.svg             # App favicon
│   └── icons.svg               # SVG icons sheet
├── scripts/
│   ├── whatsapp-personal-bot.js    # Live WhatsApp Web Bot runner (ESM)
│   └── whatsapp-personal-bot.cjs   # Live WhatsApp Web Bot runner (CommonJS)
├── src/
│   ├── assets/                 # Graphics, logos, and images
│   ├── components/
│   │   ├── common/             # Badges, Logo, Memory Graph Visualizer, Demo Pitch Bar
│   │   ├── layout/             # Header, Sidebar, Command Palette
│   │   ├── modals/             # Upload Modal, WhatsApp Live Modal, Member Drawer
│   │   └── views/              # Overview, Ask ECHO, Timeline, Sources, Insights, Team, Settings
│   ├── services/
│   │   ├── embeddingEngine.js  # TF-IDF tokenization & cosine similarity calculation
│   │   ├── hinglishParser.js   # Hinglish intent parser & dictionary translator
│   │   ├── ingestionEngine.js # Multi-file parsing & document chunker
│   │   ├── liveSyncService.js # Live WhatsApp API polling service
│   │   ├── memoryStore.js     # Mock memory store & initial team dataset
│   │   ├── ocrEngine.js        # Tesseract OCR image text extractor
│   │   ├── ragEngine.js        # RAG query processing engine
│   │   └── supabaseClient.js   # Supabase client initializer
│   ├── App.jsx                 # Main application container & view router
│   ├── index.css               # Global Tailwind CSS styles & custom utility classes
│   └── main.jsx                # Application entrypoint
├── supabase/
│   └── schema.sql              # Database schema & vector index definition
├── vite.config.js              # Vite server configuration & API middleware
├── package.json                # Project dependencies and scripts
└── README.md                   # Project documentation
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: `v18.0.0` or higher
- **npm**: `v9.0.0` or higher

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/jatinJadoun324/ECHO-.git
   cd ECHO-
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables** *(Optional for Cloud Persistence)*:  
   Create a `.env.local` file in the project root:
   ```env
   VITE_SUPABASE_URL=https://your-supabase-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```

4. **Start the Development Server**:
   ```bash
   npm run dev
   ```
   Open your browser at `http://localhost:5173`.

---

## 🤖 Running the Live WhatsApp Synchronization Bot

ECHO includes a personal WhatsApp bot powered by `whatsapp-web.js` that continuously streams incoming team chats directly into your local memory engine.

To launch the WhatsApp bot:

```bash
node scripts/whatsapp-personal-bot.js
```

1. A **QR Code** will be generated in your terminal.
2. Scan the QR code using your WhatsApp app (**Linked Devices** > **Link a Device**).
3. Any new messages received will automatically sync with the ECHO live memory engine every 2.5 seconds via the local Vite middleware (`/api/live-whatsapp`).

---

## 🗄️ Supabase Database Setup

To enable cloud vector storage and persistence:

1. Create a new project in [Supabase](https://supabase.com/).
2. Open the **SQL Editor** in your Supabase Dashboard.
3. Paste and execute the SQL contents from [`supabase/schema.sql`](file:///Users/kaizen/Downloads/ERROR%20404/supabase/schema.sql).

This sets up:
- `memories`: Stores context chunks and vector embeddings.
- `team_members`: Tracks member roles, commitments, and active blockers.
- `sources`: Stores ingested file metadata.
- `chat_logs`: Live chat message history.

---

## 🌐 Deployment

### Deploying to Cloudflare Pages (Recommended)

This project is pre-configured with a [`public/_redirects`](file:///Users/kaizen/Downloads/ERROR%20404/public/_redirects) file for single-page application (SPA) routing.

#### Option A: Direct CLI Deployment via Wrangler
```bash
# Build the project
npm run build

# Deploy using Wrangler CLI
npx wrangler pages deploy dist --project-name=echo-memory-engine
```

#### Option B: GitHub Repository Integration
1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/) > **Workers & Pages** > **Create application** > **Pages**.
2. Connect to your GitHub repository `jatinJadoun324/ECHO-`.
3. Set the build parameters:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Build Output Directory**: `dist`
4. Deploy!

---

## 👥 Team ERROR 404

Developed with ❤️ for **HackSynapse 2026**:
- **Jatin Jadoun** — *Project Lead & System Architect*
- **Rahul** — *Backend & Database Lead*
- **Aman** — *Frontend Lead & UX Developer*
- **Priya** — *ML Engine & NLP Lead*

---

## 📄 License

This project is licensed under the MIT License — see the `LICENSE` file for details.
