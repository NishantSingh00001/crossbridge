const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  name: String,
  email: { type: String, unique: true, sparse: true },
  passwordHash: String, // for now, stub (use bcrypt in prod)
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
