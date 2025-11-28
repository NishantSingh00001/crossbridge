const axios = require('axios');

async function sendMessage({ chatId, text }) {
  // Option A: Use Telegram Bot API via HTTPS
  const token = process.env.TELEGRAM_BOT_TOKEN;
  if (!token) {
    console.log('[telegramService] no token set; mock send:', { chatId, text });
    return { ok: true, mock: true };
  }
  const url = `https://api.telegram.org/bot${token}/sendMessage`;
  try {
    const res = await axios.post(url, { chat_id: chatId, text });
    return res.data;
  } catch (err) {
    console.error('telegram send err', err.response ? err.response.data : err.message);
    throw err;
  }
}

module.exports = { sendMessage };
