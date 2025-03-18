const axios = require('axios');
const jimp = require("jimp");
const fs = require("fs")


module.exports = {
 config: {
 name: "fuck",
 aliases: ["fuck bbz"],
 version: "1.0",
 author: "SK-SIDDIK-KHAN",
 countDown: 5,
 role: 0,
 shortDescription: "",
 longDescription: "",
 category: "18+",
 guide: "{pn}"
 },



 onStart: async function ({ message, event, args }) {
 const mention = Object.keys(event.mentions);
 if (mention.length == 0) return message.reply("Please mention 1 person");
 else if (mention.length == 1) {
 const one = event.senderID, two = mention[0];
 bal(one, two).then(ptth => { message.reply({ body: "🔰 ғᴜᴄᴋ ʏᴏᴜ ʙᴀʙʏ ᴜᴍᴀᴀʜ 🔰", attachment: fs.createReadStream(ptth) }) })
 } else {
 const one = mention[1], two = mention[0];
 bal(one, two).then(ptth => { message.reply({ body: "", attachment: fs.createReadStream(ptth) }) })
 }
 }


};

async function bal(one, two) {

 let avone = await jimp.read(`https://graph.facebook.com/${one}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`)
 avone.circle()
 let avtwo = await jimp.read(`https://graph.facebook.com/${two}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`)
 avtwo.circle()
 let pth = "fucked.png"
 let img = await jimp.read("https://i.ibb.co/YpR7Bpv/image.jpg")

 img.resize(639,  480).composite(avone.resize(90, 90), 23, 320).composite(avtwo.resize(100, 100), 110, 60);

 await img.writeAsync(pth)
 return pth
}
