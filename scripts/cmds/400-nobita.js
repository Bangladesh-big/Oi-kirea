module.exports = {
  config: {
    name: "nobita",
    aliases: ["nobita",],
    version: "1.0",
    author: "SIDDIK",
    countDown: 5,
    role: 0,
    shortDescription: "get nobita video",
    longDescription: "it will send you nobita video from lyrics edit vibe group",
    category: "music",
    guide: "{pn} bd",
  },
 
  sentVideos: [],
 
  onStart: async function ({ api, event, message }) {
    const senderID = event.senderID;
 
    const loadingMessage = await message.reply({
      body: "Loading Nobita Short video... Please wait! 🕐",
    });
 
    const link = [
"https://i.imgur.com/u5N7sqe.mp4",
"https://i.imgur.com/0u32UXX.mp4",
"https://i.imgur.com/sj3Asr2.mp4",
"https://i.imgur.com/sJ3iQFR.mp4",
"https://i.imgur.com/6IxQjHb.mp4",
"https://i.imgur.com/SpQImVm.mp4",
"https://i.imgur.com/rsXHTME.mp4",
"https://i.imgur.com/bVCNwBl.mp4",
"https://i.imgur.com/lpLN8j6.mp4",
"https://i.imgur.com/mNekuge.mp4",
"https://i.imgur.com/5EXQnUm.mp4",
"https://i.imgur.com/sn1nM55.mp4",
"https://i.imgur.com/vatwDvn.mp4",
"https://i.imgur.com/Is914QQ.mp4",
"https://i.imgur.com/4EGKkBr.mp4",
"https://i.imgur.com/KMhExnR.mp4",
"https://i.imgur.com/2exQMrj.mp4",
"https://i.imgur.com/yjDclse.mp4",
"https://i.imgur.com/2exQMrj.mp4",
"https://i.imgur.com/yjDclse.mp4",
"https://i.imgur.com/OxkI89B.mp4",
"https://i.imgur.com/Ma5IKum.mp4",
"https://i.imgur.com/TDx2wE5.mp4",
"https://i.imgur.com/xgAoeB9.mp4",
"https://i.imgur.com/TDx2wE5.mp4",
"https://i.imgur.com/xgAoeB9.mp4",
"https://i.imgur.com/vKtOrOC.mp4",
"https://i.imgur.com/BfeZuuR.mp4",
"https://i.imgur.com/8zvYfUL.mp4",
"https://i.imgur.com/dUtiu6e.mp4",
"https://i.imgur.com/brJkCMN.mp4",
"https://i.imgur.com/A7jM45X.mp4",
"https://i.imgur.com/g7DH0YU.mp4",
"https://i.imgur.com/4aWS06D.mp4",
"https://i.imgur.com/pHsTWyQ.mp4",
  
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
        body: '[𝐃𝐎𝐑𝐄𝐌𝐎𝐍 𝐂𝐀𝐑𝐓𝐎𝐎𝐍𝐒 𝐍𝐎𝐁𝐈𝐓𝐀 𝐏𝐀𝐑𝐓 𝐎𝐅 𝐒𝐓𝐎𝐑𝐘 𝐕𝐈𝐃𝐄𝐎]',
        attachment: await global.utils.getStreamFromURL(randomVideo),
      });
 
      setTimeout(() => {
        api.unsendMessage(loadingMessage.messageID);
      }, 5000);
    }
  },
};
