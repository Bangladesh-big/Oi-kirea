module.exports = {
  config: {
    name: "prefix",
    aliases: ["Prefiz2", "px2"],
    version: "1.2",
    author: "SK-SIDDIK-KHAN",
    countDown: 5,
    role: 0,
    category: "auto",
  },

  onStart: async function () {},

  onChat: async function ({ event, message, usersData }) {
    try {
      if (event.body && event.body.toLowerCase() === "prefix") {
        
        const userData = await usersData.get(event.senderID);
        const username = userData?.name || "User";

        const botPrefix = global.GoatBot?.config?.prefix || "No prefix set";

        return message.reply({
          body: `┏━━━━━━━━━━━━━━━━━━☾︎\n├‣ 𝐏𝐑𝐄𝐅𝐈𝐗-𝐂𝐌𝐃\n├‣ ${username}\n├‣ 𝐁𝐎𝐓-𝐏𝐑𝐄𝐅𝐈𝐗:【 ${botPrefix} 】\n├‣ 𝐎𝐖𝐍𝐄𝐑: 𝐒𝐊-𝐒𝐈𝐃𝐃𝐈𝐊\n┗━━━━━━━━━━━━━━━━━━☾︎`,
          mentions: [{ tag: username, id: event.senderID }],
          attachment: await global.utils.getStreamFromURL("https://i.imgur.com/jh4xtD2.jpeg"),
        });
      }
    } catch (error) {
      console.error("Error in prefix command:", error);
      return message.reply("⚠️ An error occurred while processing your request. Please try again later.");
    }
  },
};
