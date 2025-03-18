module.exports = {
  config: {
    name: "gcadmin",
    aliases: ['boxadmin','gcadmin', 'groupadmin'],
    version: "2.0.0",
    author: "SK-SIDDIK-KHAN",
    countDown: 5,
    role: 2,
    shortDescription: "Group Admin Manager",
    longDescription: "Add And Remove Group Admin",
    category: "box",
    guide: {
      en: "{p}{n} uid or mention / remove uid or mention",
    }
  },
 
  onStart: async function ({ api, event, args }) {
    const command = args[0];
    const target = args.slice(1).join(" ");
    const threadID = event.threadID;
 
    switch (command) {
      case "add":
        await addAdmin(api, event, threadID, target);
        break;
      case "remove":
        await removeAdmin(api, event, threadID, target);
        break;
      default:
        api.sendMessage("Invalid command! Usage: " + this.config.guide.en, threadID);
    }
  }
};
 
async function addAdmin(api, event, threadID, target) {
  try {
    const userID = await resolveUserID(api, event, target);
    await api.changeAdminStatus(threadID, userID, true);
    const userName = await api.getUserInfo(userID);
    api.sendMessage(`You Are Now Admin Of This GC My Lord ${userName[userID].name}`, threadID);
  } catch (error) {
    console.error("Error adding admin:", error);
    api.sendMessage("Failed to add user as admin.", threadID);
  }
}
 
async function removeAdmin(api, event, threadID, target) {
  try {
    const userID = await resolveUserID(api, event, target);
    await api.changeAdminStatus(threadID, userID, false);
    api.sendMessage(``, threadID);
  } catch (error) {
    console.error("Error removing admin:", error);
    api.sendMessage("Failed to remove user from admin position.", threadID);
  }
}
 
async function resolveUserID(api, event, target) {
  let userID;
  if (target.startsWith('@')) {
    const { mentions } = event;
    for (const mentionID in mentions) {
      if (mentions[mentionID].replace("@", "") === target.slice(1)) {
        userID = mentionID;
        break;
      }
    }
    if (!userID) {
      throw new Error("User not found!");
    }
  } else {
    userID = target;
  }
  return userID;
}
