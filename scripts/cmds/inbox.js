module.exports = {
  config: {
    name: "inbox",
    aliases: ["inboxme", "in"],
    version: "1.0",
    author: "SK-SIDDIK-KHAN",
    countDown: 10,
    role: 0,
    shortDescription: {
      en: "Send an inbox message"
    },
    longDescription: {
      en: "This command sends an image and a message to the user."
    },
    category: "fun",
    guide: {
      en: "Use {p}inbox to receive an inbox message."
    }
  },
  onStart: async function ({ api, event, message }) {
    try {
      const attachment = await global.utils.getStreamFromURL("https://i.imgur.com/PaS2l27.jpeg");

      await message.reply({
        body: "☽━━━━━━━━━━━━━━━━━━☾\n🌝 স্যার, আপনার ইনবক্সে গালি দিছি চেক দিয়েন 🫂\n☽━━━━━━━━━━━━━━━━━━☾",
        attachment
      });

      await api.sendMessage("𝐀𝐒𝐒𝐀𝐋𝐀𝐌𝐔 𝐖𝐀𝐋𝐀𝐈𝐊𝐔𝐌\n𝐀𝐍𝐘 𝐏𝐑𝐎𝐁𝐋𝐄𝐌", event.senderID);
    } catch (error) {
      console.error("Error:", error);
      await api.sendMessage("দুঃখিত, কিছু একটা সমস্যা হয়েছে!", event.threadID);
    }
  }
};
