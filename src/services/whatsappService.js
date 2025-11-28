const axios = require('axios');

async function sendMessage({ to, text }) {
  // Option A: Twilio API, or WhatsApp Cloud API
  if (!process.env.TWILIO_ACCOUNT_SID) {
    console.log('[whatsappService] no credentials; mock send:', { to, text });
    return { ok: true, mock: true };
  }

  // Example: Twilio Messaging (simplified)
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const from = process.env.WHATSAPP_PHONE_NUMBER; // 'whatsapp:+1415xxxx'
  const url = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`;

  try {
    const params = new URLSearchParams();
    params.append('From', from);
    params.append('To', to);
    params.append('Body', text);
    const res = await axios.post(url, params, {
      auth: { username: accountSid, password: authToken }
    });
    return res.data;
  } catch (err) {
    console.error('whatsapp send err', err.response ? err.response.data : err.message);
    throw err;
  }
}

module.exports = { sendMessage };
