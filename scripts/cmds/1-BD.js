module.exports = {
  config: {
    name: "bd",
    aliases: ["lyricseditvibe", "lyricsvideo", "lyricaledit"],
    version: "1.0",
    author: "SIDDIK",
    countDown: 20,
    role: 0,
    shortDescription: "get lyrical video",
    longDescription: "it will send you lyrical video from lyrics edit vibe group",
    category: "user",
    guide: "{pn} bd",
  },
 
  sentVideos: [],
 
  onStart: async function ({ api, event, message }) {
    const senderID = event.senderID;
 
    const loadingMessage = await message.reply({
      body: "Loading natok Short video... Please wait! 🕐",
    });
 
    const link = [
    "https://i.imgur.com/iNCRwUz.mp4",
    "https://i.imgur.com/Opeg9MG.mp4",
    "https://i.imgur.com/6nvzJ1q.mp4",
    "https://i.imgur.com/7dqTUvv.mp4",
    "https://i.imgur.com/eCF9cBd.mp4",
    "https://i.imgur.com/iutOxsG.mp4",
    "https://i.imgur.com/G6HsY3Z.mp4",
    "https://i.imgur.com/9xiSW5o.mp4",
    "https://i.imgur.com/NT3LT2w.mp4",
    "https://i.imgur.com/vywuYQ8.mp4",
    "https://i.imgur.com/iyNLH0u.mp4",
    "https://i.imgur.com/GbOiBxK.mp4",
    "https://i.imgur.com/tuaCyjp.mp4",
    "https://i.imgur.com/TQIejDd.mp4",
    "https://i.imgur.com/DmC9av3.mp4",
    "https://i.imgur.com/Ev3TJKG.mp4",
    "https://i.imgur.com/XItdI9A.mp4",
    "https://i.imgur.com/m7zvwaq.mp4",
    "https://i.imgur.com/i3VQpLm.mp4",
    "https://i.imgur.com/C9ap29j.mp4",
    "https://i.imgur.com/GFY5fvj.mp4",
    "https://i.imgur.com/VwDPT3u.mp4",
    "https://i.imgur.com/qEfCFwj.mp4",
    "https://i.imgur.com/u8RVSk4.mp4",
    "https://i.imgur.com/G8uYNxl.mp4",
    "https://i.imgur.com/wXIBgQg.mp4",
    "https://i.imgur.com/rDNtrkr.mp4",
    "https://i.imgur.com/HmHXjyJ.mp4",
    "https://i.imgur.com/SoVP1Qe.mp4",
    "https://i.imgur.com/vznF0YY.mp4",
    "https://i.imgur.com/J59Hl1t.mp4",
    "https://i.imgur.com/dshmNdc.mp4",
    "https://i.imgur.com/cy4w6Tz.mp4",
    "https://i.imgur.com/0785PGJ.mp4",
    "https://i.imgur.com/OS2lRVW.mp4",
    "https://i.imgur.com/qh295t5.mp4",
    "https://i.imgur.com/c98dIlK.mp4",
    "https://i.imgur.com/J524CfA.mp4",
    "https://i.imgur.com/DEBRSER.mp4",
    "https://i.imgur.com/xgpGdNe.mp4",
    "https://i.imgur.com/mHa55LQ.mp4",
    "https://i.imgur.com/wK9pmGn.mp4",
    "https://i.imgur.com/BeiUY8F.mp4",
    "https://i.imgur.com/6YH1wQL.mp4",
    "https://i.imgur.com/A2OAuU9.mp4",
    "https://i.imgur.com/v8IXycg.mp4",
    "https://i.imgur.com/mlII2Ds.mp4",
    "https://i.imgur.com/Jf5ZmWU.mp4",
    "https://i.imgur.com/BsiB9jf.mp4",
    "https://i.imgur.com/QCNaneS.mp4",
    "https://i.imgur.com/1tBRKcN.mp4",
    "https://i.imgur.com/rbPxmy8.mp4",
 
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
        body: '  「 𝐒𝐊-𝐒𝐈𝐃𝐃𝐈𝐊-𝐊𝐇𝐀𝐍 」',
        attachment: await global.utils.getStreamFromURL(randomVideo),
      });
 
      setTimeout(() => {
        api.unsendMessage(loadingMessage.messageID);
      }, 5000);
    }
  },
};
