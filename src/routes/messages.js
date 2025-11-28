const express = require('express');
const router = express.Router();
const Message = require('../models/Message');

// list messages by bridge
router.get('/bridge/:bridgeId', async (req, res) => {
  const msgs = await Message.find({ bridge: req.params.bridgeId }).sort({ timestamp: 1 });
  res.json(msgs);
});

module.exports = router;
