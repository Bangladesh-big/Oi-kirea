module.exports = {
    config: {
        name: "love9",
        version: "1.0",
        author: "SK-SIDDIK-KHAN",
        role: 0,
        category: "fun"
    },

    onStart: async function ({ message, event, args, api }) {
        const { downloadFile } = global.utils;
        const dirMaterial = path.join(__dirname, '/cache/canvas/');
        const imgPath = path.resolve(dirMaterial, 'crush11112.png');

        if (!fsExtra.existsSync(dirMaterial)) fsExtra.mkdirSync(dirMaterial, { recursive: true });

        if (!fsExtra.existsSync(imgPath)) {
            await downloadFile("https://i.imgur.com/lvj8vbM.png", imgPath);
        }

        const { threadID, messageID, senderID } = event;
        const mention = Object.keys(event.mentions);
        
        if (!mention[0]) {
            return api.sendMessage("        ", threadID, messageID);
        } else {
            const one = senderID;
            const two = mention[0];

            return makeImage({ one, two }).then((imagePath) => {
                api.sendMessage({
                    body: "         ..",
                    attachment: fs.createReadStream(imagePath)
                }, threadID, () => fs.unlinkSync(imagePath), messageID);
            });
        }
    }
}