# CrossBridge — Backend (WhatsApp ↔ Telegram Bridge)
<img width="1191" height="595" alt="Screenshot 2025-11-29 at 12 30 35 PM" src="https://github.com/user-attachments/assets/86e16b54-c9be-4181-bf7c-03a1a32e8924" />


A backend service that enables message bridging between **WhatsApp** and **Telegram**, built using the **MERN** stack (MongoDB, Express.js, Node.js).  
This backend runs independently and can be tested without a frontend.

---

## 🚀 Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB + Mongoose**
- **Socket.IO**
- **Axios**
- **Swagger (API Documentation)**
- **Ngrok (for webhook testing)**

---

## 📦 Backend Dependencies

Install required packages:

```bash
npm install express mongoose dotenv cors body-parser axios socket.io uuid
Development dependencies:

bash
Copy code
npm install -D nodemon
Optional for Swagger documentation:

bash
Copy code
npm install swagger-ui-express swagger-jsdoc
📁 Folder Structure
bash
Copy code
crossbridge-backend/
├─ .env
├─ server.js
├─ package.json
├─ README.md
├─ src/
│  ├─ config/db.js
│  ├─ models/
│  │  ├─ User.js
│  │  ├─ Account.js
│  │  ├─ Bridge.js
│  │  └─ Message.js
│  ├─ routes/
│  │  ├─ auth.js
│  │  ├─ bridges.js
│  │  └─ messages.js
│  ├─ webhooks/
│  │  ├─ telegram.js
│  │  └─ whatsapp.js
│  ├─ services/
│  │  ├─ messageRouter.js
│  │  ├─ telegramService.js
│  │  └─ whatsappService.js
│  └─ utils/normalize.js
⚙️ Environment Setup
Create a .env file:

ini
Copy code
PORT=5000
MONGO_URI=mongodb://localhost:27017/crossbridge

# Telegram Bot
TELEGRAM_BOT_TOKEN=your_telegram_bot_token

# WhatsApp (Twilio / Cloud API)
TWILIO_ACCOUNT_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
WHATSAPP_PHONE_NUMBER=whatsapp:+1415xxxxxxx
▶️ Running the Backend
1. Start MongoDB
If you installed via Homebrew:

bash
Copy code
brew services start mongodb-community
2. Install dependencies
bash
Copy code
npm install
3. Run in development mode
bash
Copy code
npm run dev
Server runs at:

arduino
Copy code
http://localhost:5000
🌍 Expose Localhost for Webhooks (ngrok)
To test WhatsApp and Telegram incoming messages:

bash
Copy code
ngrok http 5000
Use the generated URL for:

Telegram Webhook

WhatsApp/Twilio Webhook
