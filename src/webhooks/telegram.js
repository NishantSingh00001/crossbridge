const express = require('express');
const router = express.Router();
const normalize = require('../utils/normalize');
const messageRouter = require('../services/messageRouter');

// Telegram will POST updates here (if you set webhook)
router.post('/', async (req, res) => {
  try {
    const update = req.body;
    const normalized = normalize.fromTelegram(update);
    // route normalized message (saves to DB, forwards to target)
    await messageRouter.handleIncoming(normalized, { platform: 'telegram', raw: update });
    res.status(200).json({ ok: true });
  } catch (err) {
    console.error('telegram webhook error', err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
