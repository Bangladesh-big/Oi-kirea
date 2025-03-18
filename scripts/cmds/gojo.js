module.exports = {
	config: {
		name: "gojo",
		version: "1.0",
		author: "SK-SIDDIK-KHAN",
		countDown: 5,
		role: 0,
		category: "user",
	},
 
	 onStart: async function ({ api, event, message }) {
    const senderID = event.senderID;
 
    const loadingMessage = await message.reply({
      body: "Loading Gojo Pic... Please wait! ⏰",
    });
     
	 var link = [ "https://i.imgur.com/RKTWov0.jpeg",
 
"https://i.imgur.com/vBocwop.jpeg",
 
"https://i.imgur.com/tTZsRfh.jpeg",
 
"https://i.imgur.com/yT69Sac.jpeg",
 
"https://i.imgur.com/1qWJ1vy.jpeg",
 
"https://i.imgur.com/Xc2uBRl.jpeg",
 
"https://i.imgur.com/kU4R0XK.jpeg",
 
"https://i.imgur.com/lDDBFYH.mp4",
 
"https://i.imgur.com/hwFV9Sq.jpeg",
 
 "https://i.imgur.com/T48CEO6.jpeg",
 
"https://i.imgur.com/W8GfqZN.jpeg",
 
"https://i.imgur.com/zkApVTb.jpeg",
 
"https://i.imgur.com/emUbsFl.jpeg",
 
"https://i.imgur.com/WYBJMjm.jpeg",
 
"https://i.imgur.com/QHQGDBj.jpeg",
 
"https://i.imgur.com/vtCL7i6.jpeg",
 
"https://i.imgur.com/2RDEUIR.jpeg",
 
"https://i.imgur.com/AnqajiQ.jpeg",
 
"https://i.imgur.com/NinTb5o.jpeg",
 
"https://i.imgur.com/QgBL32P.jpeg",
 
"https://i.imgur.com/NinTb5o.jpeg",
 
"https://i.imgur.com/QgBL32P.jpeg",
 
"https://i.imgur.com/gME3HeC.jpeg",
 
"https://i.imgur.com/OcVyAEg.jpeg"
    ];
let img = link[Math.floor(Math.random()*link.length)]

if (senderID !== null) {
      message.reply({
        body: '🔰𝐇𝐞𝐫𝐞 𝐈𝐬 𝐘𝐨𝐮𝐫 𝐆𝐨𝐣𝐨 𝐏𝐢𝐜𝐭𝐮𝐫𝐞🔰',
        attachment: await global.utils.getStreamFromURL(img)
      });
 
      setTimeout(() => {
        api.unsendMessage(loadingMessage.messageID);
      }, 600);
    }
  },
};
