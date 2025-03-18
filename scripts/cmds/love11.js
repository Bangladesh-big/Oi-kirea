const axios = require('axios');
const jimp = require("jimp");
const fs = require("fs");

module.exports = {
    config: {
        name: "love11",
        version: "1.0",
        author: "SK-SIDDIK-KHAN",
        countDown: 5,
        role: 0,
        category: "image" 
    },
    onStart: async function ({ message, event, args, api }) {
        const mention = Object.keys(event.mentions);
        if (mention.length === 0) return message.reply("Please mention someone");
        
        const one = event.senderID;
        const two = mention[0];

        const tag = event.mentions[two];
        return bal(one, two).then(path => {
            api.sendMessage({
                body: " " + tag + " loves you so much ❤️",
                mentions: [{
                    tag: tag,
                    id: two
                }],
                attachment: fs.createReadStream(path)
            }, event.threadID, () => fs.unlinkSync(path), event.messageID);
        });
    }
};

async function bal(one, two) {
    const avatarOnePath = 'avatarOne.jpg';
    const avatarTwoPath = 'avatarTwo.jpg';

    let getAvatarOne = (await axios.get(`https://graph.facebook.com/${one}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`, { responseType: 'arraybuffer' })).data;
    fs.writeFileSync(avatarOnePath, Buffer.from(getAvatarOne, 'utf-8'));

    let getAvatarTwo = (await axios.get(`https://graph.facebook.com/${two}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`, { responseType: 'arraybuffer' })).data;
    fs.writeFileSync(avatarTwoPath, Buffer.from(getAvatarTwo, 'utf-8'));

    const circleOne = await circle(avatarOnePath);
    const circleTwo = await circle(avatarTwoPath);

    const pth = "output_image.jpg";
    const img = await jimp.read("https://i.imgur.com/7SwmewU.jpeg");
    img.resize(1024, 562)
       .composite(circleOne.resize(284, 284), 143, 113)
       .composite(circleTwo.resize(295, 295), 605, 103);

    await img.writeAsync(pth);
    return pth;
}

async function circle(imagePath) {
    const image = await jimp.read(imagePath);
    image.circle(); 
    const circularPath = `${imagePath}_circle.png`;
    await image.writeAsync(circularPath);
    return await jimp.read(circularPath);
}