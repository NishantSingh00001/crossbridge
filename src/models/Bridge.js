const mongoose = require('mongoose');
const { Schema } = mongoose;

const bridgeSchema = new Schema({
  owner: { type: Schema.Types.ObjectId, ref: 'User' },
  sourceAccount: { type: Schema.Types.ObjectId, ref: 'Account' }, // where message originates
  targetAccount: { type: Schema.Types.ObjectId, ref: 'Account' }, // where to send
  active: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Bridge', bridgeSchema);
