const express = require('express');
const router = express.Router();
const normalize = require('../utils/normalize');
const messageRouter = require('../services/messageRouter');

// Twilio or WhatsApp Cloud webhook will POST here
router.post('/', async (req, res) => {
  try {
    const body = req.body;
    const normalized = normalize.fromWhatsApp(body);
    await messageRouter.handleIncoming(normalized, { platform: 'whatsapp', raw: body });
    res.status(200).send('EVENT_RECEIVED');
  } catch (err) {
    console.error('whatsapp webhook error', err);
    res.status(500).send('ERROR');
  }
});

module.exports = router;
