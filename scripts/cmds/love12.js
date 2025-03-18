const path = require("path");
const fs = require("fs-extra");
const axios = require("axios");
const jimp = require("jimp");

module.exports = {
    config: {
        name: "love12",
        version: "1.0",
        author: "SK-SIDDIK-KHAN",
        countDown: 5,
        role: 0,
        category: "image"
    },
    onStart: async function ({ message, event, args, api }) {
        const dirMaterial = path.resolve(__dirname, 'cache', 'canvas');
        const imagePath = path.resolve(dirMaterial, 'crush.png');

        if (!fs.existsSync(dirMaterial)) fs.mkdirSync(dirMaterial, { recursive: true });

        if (!fs.existsSync(imagePath)) {
            try {
                const response = await axios({
                    url: "https://i.imgur.com/PlVBaM1.jpg",
                    method: "GET",
                    responseType: "stream"
                });
                response.data.pipe(fs.createWriteStream(imagePath));
                await new Promise((resolve) => response.data.on("end", resolve));
            } catch (error) {
                console.error("Error downloading crush.png:", error);
                return api.sendMessage("Failed to download the required image.", event.threadID, event.messageID);
            }
        }

        const { threadID, messageID, senderID } = event;
        const mention = Object.keys(event.mentions);
        if (!mention[0]) {
            return api.sendMessage("💚 যার সাথে ফ্রেম বানাতে চান তাকে মেনশন করুন ✅", threadID, messageID);
        }

        const one = senderID, two = mention[0];
        const pathImg = await makeImage({ one, two });
        return api.sendMessage({
            body: "•🦋💛🌸\n\n\n𝗟𝗶𝗳𝗲 𝗶𝘀 𝗲𝗮𝘀𝘆 𝘁𝗼 𝗰𝗼𝗺𝗲 𝗯𝘂𝘁 𝗵𝗮𝗿𝗱 𝘁𝗼 𝘀𝘁𝗮𝘆✨\n\nজীবনে আসা সহজ কিন্তু থেকে যাওয়া কঠিন!🙂💔\n\n\n•😘🦋💛",
            attachment: fs.createReadStream(pathImg)
        }, threadID, () => fs.unlinkSync(pathImg), messageID);
    }
};

async function makeImage({ one, two }) {
    const __root = path.resolve(__dirname, "cache", "canvas");
    const batgiam_img = await jimp.read(path.resolve(__root, "crush.png"));
    const pathImg = path.resolve(__root, `batman${one}_${two}.png`);
    const avatarOne = path.resolve(__root, `avt_${one}.png`);
    const avatarTwo = path.resolve(__root, `avt_${two}.png`);

    const getAvatarOne = (await axios.get(`https://graph.facebook.com/${one}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`, { responseType: 'arraybuffer' })).data;
    fs.writeFileSync(avatarOne, Buffer.from(getAvatarOne, 'utf-8'));

    const getAvatarTwo = (await axios.get(`https://graph.facebook.com/${two}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`, { responseType: 'arraybuffer' })).data;
    fs.writeFileSync(avatarTwo, Buffer.from(getAvatarTwo, 'utf-8'));

    const circleOne = await jimp.read(await circle(avatarOne));
    const circleTwo = await jimp.read(await circle(avatarTwo));

    batgiam_img
        .composite(circleOne.resize(191, 191), 93, 111)
        .composite(circleTwo.resize(190, 190), 434, 107);

    const raw = await batgiam_img.getBufferAsync("image/png");
    fs.writeFileSync(pathImg, raw);
    fs.unlinkSync(avatarOne);
    fs.unlinkSync(avatarTwo);

    return pathImg;
}

async function circle(imagePath) {
    const image = await jimp.read(imagePath);
    image.circle();
    return await image.getBufferAsync("image/png");
}