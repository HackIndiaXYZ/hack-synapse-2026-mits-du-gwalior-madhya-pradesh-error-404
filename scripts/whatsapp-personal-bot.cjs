/**
 * ECHO Personal WhatsApp Auto-Sync Bot (CommonJS Version .cjs)
 * Robust & Crash-Proof Implementation with Auto-File Creation
 */

const fs = require('fs');
const path = require('path');

let clientModule;
try {
  clientModule = require('whatsapp-web.js');
} catch (e) {
  console.log('⚠️ whatsapp-web.js not installed yet. Installing helper packages...');
  require('child_process').execSync('npm install whatsapp-web.js qrcode-terminal', { stdio: 'inherit' });
  clientModule = require('whatsapp-web.js');
}

const { Client, LocalAuth } = clientModule;
const qrcode = require('qrcode-terminal');

const AUTH_DIR = path.join(__dirname, '../.whatsapp-auth');
if (!fs.existsSync(AUTH_DIR)) {
  fs.mkdirSync(AUTH_DIR, { recursive: true });
}
const LIVE_MEMORY_FILE = path.join(AUTH_DIR, 'live_whatsapp_memory.txt');

// Ensure live memory file exists immediately on startup!
if (!fs.existsSync(LIVE_MEMORY_FILE)) {
  fs.writeFileSync(LIVE_MEMORY_FILE, `[Live WhatsApp Stream Initialized]\n`, 'utf8');
}

console.log('\n🤖 Starting ECHO Personal WhatsApp Auto-Sync Bot...');

const client = new Client({
  authStrategy: new LocalAuth({ dataPath: AUTH_DIR }),
  puppeteer: {
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  }
});

client.on('qr', (qr) => {
  console.log('\n📲 SCAN THIS QR CODE WITH YOUR PERSONAL WHATSAPP:\n');
  console.log('Open WhatsApp on Phone -> Settings/Menu -> Linked Devices -> Link a Device\n');
  qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
  console.log('\n===========================================================');
  console.log('✅ ECHO WHATSAPP BOT IS CONNECTED & LISTENING LIVE!');
  console.log('===========================================================');
  console.log('👉 Send ANY message in your WhatsApp group right now!');
  console.log('👉 Both YOUR messages and OTHER members\' messages will capture!\n');
});

// CRITICAL FIX: message_create captures ALL messages (sent by you & received from others!)
client.on('message_create', async (msg) => {
  try {
    if (!msg || !msg.body || msg.body.trim().length === 0) return;

    let groupName = 'WhatsApp Chat';
    let speakerName = msg.fromMe ? 'You' : 'Team Member';

    try {
      const chat = await msg.getChat();
      if (chat && chat.name) groupName = chat.name;

      if (!msg.fromMe) {
        const contact = await msg.getContact();
        if (contact && (contact.pushname || contact.name)) {
          speakerName = contact.pushname || contact.name;
        }
      }
    } catch (e) {
      if (msg.author) {
        speakerName = msg.author.replace(/@c\.us|@g\.us/g, '');
      }
    }

    const timestamp = new Date((msg.timestamp || Date.now() / 1000) * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const content = msg.body;

    console.log(`\n📥 LIVE WHATSAPP MESSAGE CAPTURED!`);
    console.log(`├─ Chat:      ${groupName}`);
    console.log(`├─ Speaker:   ${speakerName}`);
    console.log(`├─ Time:      ${timestamp}`);
    console.log(`└─ Message:   "${content}"\n`);

    // Write to live WhatsApp memory file
    const formattedLine = `${speakerName} [${timestamp}]: "${content}"\n`;
    fs.appendFileSync(LIVE_MEMORY_FILE, formattedLine, 'utf8');

  } catch (err) {
    // Quiet background handling
  }
});

client.initialize();
