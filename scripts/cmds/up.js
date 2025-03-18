module.exports = {
  config: {
    name: "up",
    aliases: ["upt", "upts"],
    version: "1.0",
    author: "SK-SIDDIK-KHAN",
    role: 0,
    category: "user",
  },
  onStart: async function ({ api, event, message, threadsData, usersData }) {
    const uptime = process.uptime();
    const seconds = Math.floor(uptime % 60);
    const minutes = Math.floor((uptime / 60) % 60);
    const hours = Math.floor((uptime / (60 * 60)) % 24);
    const days = Math.floor(uptime / (60 * 60 * 24));

    const now = new Date();
    const formattedDate = now.toLocaleDateString("en-US", { year: "numeric", month: "numeric", day: "numeric", timeZone: "Asia/Dhaka" });
    const formattedTime = now.toLocaleTimeString("en-US", { timeZone: "Asia/Dhaka", hour12: true });
    
    const uptimeInfo = `${hours} ঘন্টা ${minutes} মিনিট ${seconds} সেকেন্ড`;

    const threadData = await threadsData.get(event.threadID);
    const threadName = threadData.threadName || "Unknown Group";
    const userData = await usersData.get(event.senderID);
    const userName = userData ? userData.name : "Unknown User";

    const replyMessage = `
┏━━━━━━━━━━━━━━━━━━☾︎
┃𝐓𝐲𝐩𝐞 : ${userName}
┃𝐔𝐩 : ${uptimeInfo}
┃𝐁𝐨𝐭 𝐍𝐚𝐦𝐞 : 𝐒𝐊_𝐒𝐈𝐃𝐃𝐈𝐊_⓿❼
┃𝐏𝐫𝐞𝐟𝐢𝐱 : 【 ${global.GoatBot.config.prefix} 】
┃𝐓𝐢𝐦𝐞 : ${formattedTime} 
┃𝐃𝐚𝐭𝐞 : ${formattedDate}
┃𝐆𝐜 𝐍𝐚𝐦𝐞 : ${threadName}
┃𝐓𝐡𝐚𝐧𝐤𝐬 𝐅𝐨𝐫 𝐔𝐬𝐢𝐧𝐠 𝐒𝐤 𝐁𝐨𝐭
┗━━━━━━━━━━━━━━━━━━☾︎`;

    message.reply({
      body: replyMessage,
      attachment: await global.utils.getStreamFromURL("https://i.imgur.com/oWoktLm.jpeg")
    });
  }
};
