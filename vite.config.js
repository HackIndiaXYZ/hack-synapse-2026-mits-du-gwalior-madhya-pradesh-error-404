import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import fs from 'fs'
import path from 'path'

// Ensure auth dir & memory log exist
const AUTH_DIR = path.join(process.cwd(), '.whatsapp-auth');
if (!fs.existsSync(AUTH_DIR)) {
  fs.mkdirSync(AUTH_DIR, { recursive: true });
}
const LIVE_MEMORY_FILE = path.join(AUTH_DIR, 'live_whatsapp_memory.txt');
if (!fs.existsSync(LIVE_MEMORY_FILE)) {
  fs.writeFileSync(LIVE_MEMORY_FILE, `[Live WhatsApp Stream Connected]\n`, 'utf8');
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(), 
    tailwindcss(),
    {
      name: 'live-whatsapp-api-middleware',
      configureServer(server) {
        // GET live messages endpoint
        server.middlewares.use('/api/live-whatsapp', (req, res, next) => {
          if (req.method === 'GET' && req.url === '/api/live-whatsapp') {
            let content = '';
            if (fs.existsSync(LIVE_MEMORY_FILE)) {
              content = fs.readFileSync(LIVE_MEMORY_FILE, 'utf8');
            }
            res.setHeader('Content-Type', 'application/json');
            res.setHeader('Access-Control-Allow-Origin', '*');
            return res.end(JSON.stringify({ text: content, count: content.split('\n').filter(Boolean).length }));
          }

          // POST test message endpoint
          if (req.method === 'POST' && req.url === '/api/live-whatsapp') {
            let body = '';
            req.on('data', chunk => { body += chunk.toString(); });
            req.on('end', () => {
              try {
                const parsed = JSON.parse(body || '{}');
                const line = `${parsed.speaker || 'Saksham'} [${parsed.timestamp || 'Just now'}]: "${parsed.content || 'Live test update'}"\n`;
                fs.appendFileSync(LIVE_MEMORY_FILE, line, 'utf8');
                res.setHeader('Content-Type', 'application/json');
                return res.end(JSON.stringify({ success: true, added: line }));
              } catch (e) {
                res.statusCode = 400;
                return res.end(JSON.stringify({ error: e.message }));
              }
            });
            return;
          }

          next();
        });
      }
    }
  ],
  server: {
    watch: {
      ignored: [
        '**/live_whatsapp_memory.txt',
        '**/.whatsapp-auth/**',
        '**/scripts/**'
      ]
    }
  }
})
