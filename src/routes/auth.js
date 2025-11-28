const express = require('express');
const router = express.Router();
const User = require('../models/User');

// create user (dev)
router.post('/register', async (req, res) => {
  const { name, email } = req.body;
  const user = new User({ name, email });
  await user.save();
  res.json({ ok: true, user });
});

router.get('/me/:id', async (req, res) => {
  const user = await User.findById(req.params.id);
  res.json(user);
});

module.exports = router;
