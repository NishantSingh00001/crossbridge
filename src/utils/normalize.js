module.exports = {
  fromTelegram(update) {
    // handle message vs callback etc. Simplified:
    const msg = update.message || update.edited_message || {};
    const from = msg.from || {};
    const text = msg.text || (msg.caption) || '';
    const platformMessageId = msg.message_id ? String(msg.message_id) : (update.update_id && String(update.update_id));
    return {
      platform: 'telegram',
      platformMessageId,
      sender: from.id ? String(from.id) : from.username || from.first_name,
      recipient: msg.chat ? String(msg.chat.id) : null,
      content: text,
      raw: update
    };
  },

  fromWhatsApp(body) {
    // Twilio webhook shape differs — this is a simplified version expecting fields:
    // { From: 'whatsapp:+123...', Body: 'hello', MessageSid: 'SM...' }
    const from = body.From || (body.entry && body.entry[0] && body.entry[0].changes[0].value.messages && body.entry[0].changes[0].value.messages[0].from);
    const text = body.Body || (body.entry && body.entry[0] && body.entry[0].changes[0].value.messages[0].text && body.entry[0].changes[0].value.messages[0].text.body) || '';
    const platformMessageId = body.MessageSid || (body.entry && body.entry[0] && body.entry[0].changes[0].value.messages[0].id);
    return {
      platform: 'whatsapp',
      platformMessageId: String(platformMessageId),
      sender: String(from),
      recipient: body.To || (body.entry && body.entry[0] && body.entry[0].changes[0].value.metadata && body.entry[0].changes[0].value.metadata.phone_number_id),
      content: text,
      raw: body
    };
  }
};
