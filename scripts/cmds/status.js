const { GoatWrapper } = require("fca-liane-utils");

const { getStreamFromURL } = require("fb-watchman");

module.exports = {

config: {

name: "status",

version: "1.0",

author: "SK-SIDDIK-KHAN",

role: 0,

shortDescription: {

en: "stats",

},

longDescription: {

en: "shows stats of bot.",

},

category: "system",

guide: {

en: "Use {p}stats to see stats of bot.",

},

},

onStart: async function ({ api, event, args, usersData, threadsData }) {

try {

const allUsers = await usersData.getAll();

const allThreads = await threadsData.getAll();

const uptime = process.uptime();

const hours = Math.floor(uptime / 3600);

const minutes = Math.floor((uptime % 3600) / 60);

const seconds = Math.floor(uptime % 60);

const uptimeString = `${hours} : ${minutes} : ${seconds}`;

const currentDate = new Date();

const options = { year: "numeric", month: "numeric", day: "numeric" };

const date = currentDate.toLocaleDateString("en-US", options);

const time = currentDate.toLocaleTimeString("en-US", {

timeZone: "Asia/Dhaka",

hour12: true,

});

const timeStart = Date.now();

await api.sendMessage({

body: "ʟᴏᴀᴅɪɴɢ......",

}, event.threadID);

const ping = Date.now() - timeStart;

let pingStatus = "Not smooth throw your router, buddy";

if (ping < 400) {

}

// Assuming global.utils.getStreamFromURL(img) is correctly defined

const imgURL= "https://i.imgur.com/sKrJHax.jpeg";

const attachment = await global.utils.getStreamFromURL(imgURL);

api.sendMessage({

body: ` ⊙────[𝐒𝐊 𝐒𝐈𝐃𝐃𝐈𝐊]────⊙ \n├─❯🌎 | 𝚄𝚙 𝚃𝚒𝚖𝚎 : ${uptimeString}\n⊙────────────────⊙ \n├─❯📅 | 𝙳𝙰𝚃𝙴 : ${date}\n⊙────────────────⊙\n├─❯⏰ | 𝚃𝙸𝙼𝙴: ${time}\n⊙────────────────⊙ \n├─❯👪 | 𝚃𝙾𝚃𝙰𝙻 𝚄𝚂𝙴𝚁 : ${allUsers.length}\n⊙────────────────⊙\n├─❯🌸 | 𝚃𝙾𝚃𝙰𝙻 𝚃𝚁𝙷𝙴𝙰𝚁𝙳𝚂 : ${allThreads.length}\n⊙────────────────⊙\n├─❯📛 | 𝙿𝙸𝙽𝙶 : ${ping}ms\n⊙────────────────⊙`,

attachment: attachment,

}, event.threadID);

} catch (error) {

console.error(error);

api.sendMessage("An error occurred while retrieving data.", event.threadID);

}

}

};

const wrapper = new GoatWrapper(module.exports); wrapper.applyNoPrefix({ allowPrefix: true });
