const express = require('express');
const router = express.Router();
const Bridge = require('../models/Bridge');
const Account = require('../models/Account');

// create account (for testing) - create telegram/whatsapp account entries
router.post('/account', async (req, res) => {
  const { owner, type, identifier, credentials } = req.body;
  const account = await (new Account({ owner, type, identifier, credentials })).save();
  res.json(account);
});

// create bridge
router.post('/', async (req, res) => {
  const { owner, sourceAccountId, targetAccountId } = req.body;
  const bridge = new Bridge({ owner, sourceAccount: sourceAccountId, targetAccount: targetAccountId });
  await bridge.save();
  res.json(bridge);
});

// list bridges for user
router.get('/user/:userId', async (req, res) => {
  const bridges = await Bridge.find({ owner: req.params.userId }).populate('sourceAccount targetAccount');
  res.json(bridges);
});

module.exports = router;
