module.exports = {
  config: {
    name: "anix",
    version: "1.0",
    author: "SK-SIDDIK-KHAN",
    countDown: 20,
    role: 0,
    category: "user",
  },
 
  sentVideos: [],
 
  onStart: async function ({ api, event, message }) {
    const senderID = event.senderID;
 
    const loadingMessage = await message.reply({
      body: "Loading Anime Short video... Please wait! 🕐",
    });
 
    const link = [
    "https://i.imgur.com/uykTmIq.mp4",
 
"https://i.imgur.com/OKv9G8S.mp4",
 
"https://i.imgur.com/JFB2EDm.mp4",
 
"https://i.imgur.com/AZ2yc7K.mp4",
 
"https://i.imgur.com/Vph1L6w.mp4",
 
"https://i.imgur.com/GJVqdS7.mp4",
 
"https://i.imgur.com/oHJCpVW.mp4",
 
"https://i.imgur.com/7U3piUc.mp4",
 
"https://i.imgur.com/lDDBFYH.mp4",
 
"https://i.imgur.com/OKv9G8S.mp4",
 
 "https://i.imgur.com/EmgFapW.mp4",
 
"https://i.imgur.com/0Zq5fIL.mp4",
 
"https://i.imgur.com/i8M9YeG.mp4",
 
"https://i.imgur.com/9k4f3cw.mp4",
 
"https://i.imgur.com/02bMIwx.mp4",
 
"https://i.imgur.com/cEX9Shv.mp4",
 
"https://i.imgur.com/9fb8kyN.mp4",
 
"https://i.imgur.com/Jmqzdzj.mp4",
 
"https://i.imgur.com/EmgFapW.mp4",
 
"https://i.imgur.com/i8M9YeG.mp4",
 
"https://i.imgur.com/cEX9Shv.mp4",
 
];
 
    const availableVideos = link.filter(video => !this.sentVideos.includes(video));
 
    if (availableVideos.length === 0) {
      this.sentVideos = [];
    }
 
    const randomIndex = Math.floor(Math.random() * availableVideos.length);
    const randomVideo = availableVideos[randomIndex];
 
    this.sentVideos.push(randomVideo);
 
    if (senderID !== null) {
      message.reply({
        body: '🔰 𝐇𝐞𝐫𝐞 𝐢𝐬 𝐲𝐨𝐮𝐫 𝐀𝐧𝐢𝐦𝐞 𝐕𝐢𝐝𝐞𝐨🔰',
        attachment: await global.utils.getStreamFromURL(randomVideo),
      });
 
      setTimeout(() => {
        api.unsendMessage(loadingMessage.messageID);
      }, 5000);
    }
  },
};
