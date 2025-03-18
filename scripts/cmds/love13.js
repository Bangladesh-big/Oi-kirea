module.exports = {
    config: {
        name: "love13",
        version: "1.0",
        author: "SK-SIDDIK-KHAN",
        countDown: 5,
        role: 0,
        category: "fun"
    },
    onStart: async function ({ message, event, args, api }) {
        const dirMaterial = path.resolve(__dirname, 'cache', 'canvas');
        const imagePath = path.resolve(dirMaterial, 'nn.png');

        if (!fs.existsSync(dirMaterial)) fs.mkdirSync(dirMaterial, { recursive: true });

        if (!fs.existsSync(imagePath)) {
            try {
                const response = await axios({
                    url: "https://i.imgur.com/XWtUSC1.jpg",
                    method: "GET",
                    responseType: "stream"
                });
                response.data.pipe(fs.createWriteStream(imagePath));
                await new Promise((resolve) => response.data.on("end", resolve));
            } catch (error) {
                console.error("Error downloading nn.png:", error);
                return api.sendMessage("Failed to download the required image.", event.threadID, event.messageID);
            }
        }

        const { threadID, messageID, senderID } = event;
        const mention = Object.keys(event.mentions);
        if (!mention[0]) {
            return api.sendMessage("ভালোবাসার মানুষ টি কে টেগ করুন-!!💏🙈", threadID, messageID);
        }

        const one = senderID, two = mention[0];
        const pathImg = await makeImage({ one, two });
        return api.sendMessage({
            body: "°\n\n\n___ভালোবাসা অসম্ভব সুন্দর..!!-🥀💚🥰\n_____যদি সারা জীবন সে তোমার পাশে থাকে..!!-🖤😊\n\n\n°",
            attachment: fs.createReadStream(pathImg)
        }, threadID, () => fs.unlinkSync(pathImg), messageID);
    }
};