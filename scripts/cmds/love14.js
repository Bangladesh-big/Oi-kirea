const axios = require('axios');
const jimp = require("jimp");
const fs = require("fs");
 
module.exports = {
    config: {
        name: "love14",
        version: "1.0",
        author: "SK-SIDDIK-KHAN",
        countDown: 5,
        role: 0,
        category: "love",
        usage: "Mention your love to create an image"
    },
    onStart: async function ({ message, args, event, api }) {
        const mention = Object.keys(event.mentions);
        if (mention.length == 0) return message.reply("Please mention someone❗");
        else if (mention.length == 1) {
            const one = event.senderID, two = mention[0];
            bal(one, two).then(ptth => { message.reply({ body: "  ⊙────𝐈 𝐋𝐎𝐕𝐄 𝐘𝐎𝐔────⊙", attachment: fs.createReadStream(ptth) }) })
        } else {
            const one = mention[1], two = mention[0];
            bal(one, two).then(ptth => { message.reply({ body: " ⊙────𝐈 𝐋𝐎𝐕𝐄 𝐘𝐎𝐔────⊙", attachment: fs.createReadStream(ptth) }) })
        }
    }
};
 
async function bal(one, two) {
    const avone = await jimp.read(`https://graph.facebook.com/${one}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`);
    avone.circle();
    const avtwo = await jimp.read(`https://graph.facebook.com/${two}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`);
    avtwo.circle();
    const pth = "abcd.jpg";
    const img = await jimp.read("https://i.imgur.com/CrZn9XR.jpeg");
    img.resize(720, 406).composite(avone.resize(161, 161), 415, 110).composite(avtwo.resize(162, 162), 133, 109);
    await img.writeAsync(pth);
    return pth;
}