const mongoose = require('mongoose');
const { Schema } = mongoose;

const messageSchema = new Schema({
  bridge: { type: Schema.Types.ObjectId, ref: 'Bridge' },
  platform: { type: String, enum: ['telegram','whatsapp'] },
  platformMessageId: String,
  sender: String,
  recipient: String,
  content: String,
  mediaUrl: String,
  status: { type: String, default: 'received' },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Message', messageSchema);
