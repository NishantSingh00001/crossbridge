const mongoose = require('mongoose');
const { Schema } = mongoose;

const accountSchema = new Schema({
  owner: { type: Schema.Types.ObjectId, ref: 'User' },
  type: { type: String, enum: ['telegram','whatsapp'] },
  identifier: String, // phone number or telegramId
  credentials: Schema.Types.Mixed, // store tokens/ids safely (encrypt in prod)
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Account', accountSchema);
