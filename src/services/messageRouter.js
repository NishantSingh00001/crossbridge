const Bridge = require('../models/Bridge');
const Message = require('../models/Message');
const Account = require('../models/Account');
const telegramService = require('./telegramService');
const whatsappService = require('./whatsappService');

const handleIncoming = async (normalized, meta = {}) => {
  // normalized: { platform, platformMessageId, sender, recipient, content, raw }
  // 1) find bridges where sourceAccount.identifier == normalized.sender or sourceAccount.identifier == normalized.recipient
  const sourceAccounts = await Account.find({ identifier: { $in: [normalized.sender, normalized.recipient] }, type: normalized.platform });
  if (!sourceAccounts || sourceAccounts.length === 0) {
    console.log('No account entry found for incoming message; ignore or log for manual mapping.');
    // Optionally persist as unbridged message
    return;
  }
  // For each account, find active bridges outgoing from that account
  for (const acc of sourceAccounts) {
    const bridges = await Bridge.find({ sourceAccount: acc._id, active: true }).populate('targetAccount');
    for (const br of bridges) {
      // persist original message
      const saved = await new Message({
        bridge: br._id,
        platform: normalized.platform,
        platformMessageId: normalized.platformMessageId,
        sender: normalized.sender,
        recipient: normalized.recipient,
        content: normalized.content,
      }).save();

      // forward to target platform
      const target = br.targetAccount;
      if (!target) continue;

      if (target.type === 'whatsapp') {
        // target identifier is phone (whatsapp:+91...)
        await whatsappService.sendMessage({ to: target.identifier, text: normalized.content, bridgeId: br._id });
      } else if (target.type === 'telegram') {
        // target.identifier is chat id
        await telegramService.sendMessage({ chatId: target.identifier, text: normalized.content, bridgeId: br._id });
      }
      // optionally emit to sockets for real-time UI
      // If you have access to io, you'd emit: io.to(ownerRoom).emit('newMessage', saved)
    }
  }
};

module.exports = { handleIncoming };
