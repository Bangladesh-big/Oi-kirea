module.exports = {
  config: {
    name: "natural",
    aliases: ["ntrul"],
    version: "1.0",
    author: "SIDDIK",
    countDown: 20,
    role: 0,
    shortDescription: "get natural video",
    longDescription: "",
    category: "user",
    guide: "{pn} natural",
  },
 
  sentVideos: [],
 
  onStart: async function ({ api, event, message }) {
    const senderID = event.senderID;
 
    const loadingMessage = await message.reply({
      body: "Loading Natural Short video... Please wait! 🕐",
    });
 
    const link = [
"https://i.imgur.com/s0enSFR.mp4",
"https://i.imgur.com/G10APIS.mp4",
"https://i.imgur.com/JCR8tC2.mp4",
"https://i.imgur.com/nxYfqih.mp4",
"https://i.imgur.com/eFVgw1Q.mp4",
"https://i.imgur.com/TygOziE.mp4",
"https://i.imgur.com/7XWsucf.mp4",
"https://i.imgur.com/Joil59R.mp4",
"https://i.imgur.com/ZtX1PXj.mp4",
"https://i.imgur.com/Sxmc9vr.mp4",
"https://i.imgur.com/DoH02UH.mp4",
"https://i.imgur.com/1YPakcd.mp4",
"https://i.imgur.com/Hj4ifk4.mp4",
"https://i.imgur.com/pnzQX3o.mp4",
"https://i.imgur.com/DKKCNTN.mp4",
"https://i.imgur.com/THNxq4W.mp4",
"https://i.imgur.com/68C43RD.mp4",
"https://i.imgur.com/eM9oxrU.mp4",
"https://i.imgur.com/fyzuKIb.mp4",
"https://i.imgur.com/miliKnM.mp4",
"https://i.imgur.com/eKdcfcV.mp4",
"https://i.imgur.com/rrhSt3d.mp4",
"https://i.imgur.com/BAADKLG.mp4",
"https://i.imgur.com/YNXeRgF.mp4",
"https://i.imgur.com/qkWLIcB.mp4",
"https://i.imgur.com/LxgMw4v.mp4",
"https://i.imgur.com/gFikegj.mp4",
"https://i.imgur.com/joGj9PK.mp4",
"https://i.imgur.com/M2IAXUW.mp4",
"https://i.imgur.com/BZmbdqq.mp4", 
"https://i.imgur.com/7zGi8qk.mp4",
"https://i.imgur.com/Bxxxhx7.mp4",
"https://i.imgur.com/y48JOJ4.mp4",
"https://i.imgur.com/9Tp7DLu.mp4",

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
        body: '╭•┄「 𝐒𝐊-𝐒𝐈𝐃𝐃𝐈𝐊 」┄•╮',
        attachment: await global.utils.getStreamFromURL(randomVideo),
      });
 
      setTimeout(() => {
        api.unsendMessage(loadingMessage.messageID);
      }, 5000);
    }
  },
};
