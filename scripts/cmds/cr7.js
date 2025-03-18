module.exports = {
	config: {
		name: "cr7",
		version: "1.0",
		author: "SK-SIDDIK-KHAN",
		countDown: 5,
		role: 0,
		category: "user",
	},
 
	 onStart: async function ({ api, event, message }) {
    const senderID = event.senderID;
 
    const loadingMessage = await message.reply({
      body: "Loading Cr7 Pic... Please wait! 🕜",
    });
     
	 var link = [ "https://i.imgur.com/gwAuLMT.jpg",
 
"https://i.imgur.com/MuuhaJ4.jpg",
 
"https://i.imgur.com/6t0R8fs.jpg",
 
"https://i.imgur.com/7RTC4W5.jpg",
 
"https://i.imgur.com/VTi2dTP.jpg",
 
"https://i.imgur.com/gdXJaK9.jpg",
 
"https://i.imgur.com/VqZp7IU.jpg",
 
"https://i.imgur.com/9pio8Lb.jpg",
 
"https://i.imgur.com/iw714Ym.jpg",
 
"https://i.imgur.com/zFbcrjs.jpg",
 
"https://i.imgur.com/e0td0K9.jpg",
 
"https://i.imgur.com/gsJWOmA.jpg",
 
"https://i.imgur.com/lU8CaT0.jpg",
 
"https://i.imgur.com/mmZXEYl.jpg",
 
"https://i.imgur.com/d2Ot9pW.jpg",
 
"https://i.imgur.com/iJ1ZGwZ.jpg",
 
"https://i.imgur.com/isqQhNQ.jpg",
 
"https://i.imgur.com/GoKEy4g.jpg",
 
"https://i.imgur.com/TjxTUsl.jpg",
 
"https://i.imgur.com/VwPPL03.jpg",
 
"https://i.imgur.com/45zAhI7.jpg",
 
"https://i.imgur.com/n3agkNi.jpg",
 
"https://i.imgur.com/F2mynhI.jpg",
 
"https://i.imgur.com/XekHaDO.jpg"
    ];
let img = link[Math.floor(Math.random()*link.length)]

if (senderID !== null) {
      message.reply({
        body: '「 Ronaldo Profile For You 」',
        attachment: await global.utils.getStreamFromURL(img)
      });
 
      setTimeout(() => {
        api.unsendMessage(loadingMessage.messageID);
      }, 800);
    }
  },
};
