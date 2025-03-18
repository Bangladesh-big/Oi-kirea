const { GoatWrapper } = require("fca-liane-utils");
const { config } = global.GoatBot;
module.exports = {
	config: {
		name: "wlt",
		version: "1.0",
		author: "SK-SIDDIK-KHAN",
		countDown: 5,
		role: 2,
		longDescription: {
			en: "Add, remove, edit whiteListIds"
		},
		category: "owner",
		guide: {
			en: '   {pn} [add | -a] <uid | @tag>: Add admin role for user'
				+ '\n   {pn} [remove | -r] <uid | @tag>: Remove admin role of user'
				+ '\n   {pn} [list | -l]: List all admins'
        + '\n   {pn} [ on | off ]: enable and disable whiteList mode'
		}
	},

	langs: {
		en: {
			added: "╭✦✅ | 𝙰𝚍𝚍𝚎𝚍 %1 𝚞𝚜𝚎𝚛/𝚜\n%2",
      alreadyAdded: "\n╭✦⚠️ | 𝙰𝚕𝚛𝚎𝚊𝚍𝚢 𝚊𝚍𝚍𝚎d %1 𝚞𝚜𝚎𝚛𝚜\n%2",
      missingIdAdd: "⚠️ | 𝙿𝚕𝚎𝚊𝚜𝚎 𝚎𝚗𝚝𝚎𝚛 𝚄𝙸𝙳 𝚝𝚘 𝚊𝚍𝚍 𝚠𝚑𝚒𝚝𝚎𝙻𝚒𝚜𝚝 𝚛𝚘𝚕𝚎",
      removed: "╭✦✅ | 𝚁𝚎𝚖𝚘𝚟𝚎𝚍 %1 𝚞𝚜𝚎𝚛𝚜\n%2",
      notAdded: "╭✦⚠️ | 𝙳𝚒𝚍𝚗'𝚝 𝚊𝚍𝚍𝚎𝚍 %1 𝚞𝚜𝚎𝚛𝚜\n%2",
      missingIdRemove: "⚠️ | 𝙿𝚕𝚎𝚊𝚜𝚎 𝚎𝚗𝚝𝚎𝚛 𝚄𝙸𝙳 𝚝𝚘 𝚛𝚎𝚖𝚘𝚟𝚎 𝚠𝚑𝚒𝚝𝚎𝙻𝚒𝚜𝚝 𝚛𝚘𝚕𝚎",
      listAdmin: "╭✦✨ | 𝙻𝚒𝚜𝚝 𝚘𝚏 𝚄𝚜𝚎𝚛𝙸𝙳s\n%1\n╰‣",
      enable: "✅ | 𝚃𝚞𝚛𝚗𝚎𝚍 𝚘𝚗 𝚝𝚑𝚎 𝚖𝚘𝚍𝚎 𝚘𝚗𝚕𝚢 𝚠𝚑𝚒𝚝𝚎𝚕𝚒𝚜𝚝𝙸𝚍𝚜 𝚌𝚊𝚗 𝚞𝚜𝚎 𝚋𝚘𝚝",
      disable: "❎ | 𝚃𝚞𝚛𝚗𝚎𝚍 𝚘𝚏𝚏 𝚝𝚑𝚎 𝚖𝚘𝚍𝚎 𝚘𝚗𝚕𝚢 𝚠𝚑𝚒𝚝𝚎𝚕𝚒𝚜𝚝𝙸𝚍𝚜 𝚌𝚊𝚗 𝚞𝚜𝚎 𝚋𝚘𝚝"
		}
	},

	onStart: async function ({ message, args, usersData, event, getLang, api }) {
    const permission = ["100059026788061","100005002412625"];
    if (!permission.includes(event.senderID)) {
      api.sendMessage(
        "~you don't have permission to use this command!🐱",
        event.threadID,
        event.messageID
      );
      return;
    }
    const { writeFileSync } = require("fs-extra");
		switch (args[0]) {
			case "add":
			case "-a": {
				if (args[1]) {
					let uids = [];
					if (Object.keys(event.mentions).length > 0)
						uids = Object.keys(event.mentions);
					else if (event.messageReply)
						uids.push(event.messageReply.senderID);
					else
						uids = args.filter(arg => !isNaN(arg));
					const notAdminIds = [];
					const adminIds = [];
					for (const uid of uids) {
						if (config.whiteListMode.whiteListIds.includes(uid))
							adminIds.push(uid);
						else
							notAdminIds.push(uid);
					}

					config.whiteListMode.whiteListIds.push(...notAdminIds);
					const getNames = await Promise.all(uids.map(uid => usersData.getName(uid).then(name => ({ uid, name }))));
					writeFileSync(global.client.dirConfig, JSON.stringify(config, null, 2));
					return message.reply(
						(notAdminIds.length > 0 ? getLang("added", notAdminIds.length, getNames.map(({ uid, name }) => `• ${name} (${uid})`).join("\n")) : "")
						+ (adminIds.length > 0 ? getLang("alreadyAdmin", adminIds.length, adminIds.map(uid => `• ${uid}`).join("\n")) : "")
					);
				}
				else
					return message.reply(getLang("missingIdAdd"));
			}
			case "remove":
			case "-r": {
				if (args[1]) {
					let uids = [];
					if (Object.keys(event.mentions).length > 0)
						uids = Object.keys(event.mentions)[0];
					else
						uids = args.filter(arg => !isNaN(arg));
					const notAdminIds = [];
					const adminIds = [];
					for (const uid of uids) {
						if (config.whiteListMode.whiteListIds.includes(uid))
							adminIds.push(uid);
						else
							notAdminIds.push(uid);
					}
					for (const uid of adminIds)
						config.whiteListMode.whiteListIds.splice(config.whiteListMode.whiteListIds.indexOf(uid), 1);
					const getNames = await Promise.all(adminIds.map(uid => usersData.getName(uid).then(name => ({ uid, name }))));
					writeFileSync(global.client.dirConfig, JSON.stringify(config, null, 2));
					return message.reply(
						(adminIds.length > 0 ? getLang("removed", adminIds.length, getNames.map(({ uid, name }) => `• ${name} (${uid})`).join("\n")) : "")
						+ (notAdminIds.length > 0 ? getLang("notAdmin", notAdminIds.length, notAdminIds.map(uid => `• ${uid}`).join("\n")) : "")
					);
				}
				else
					return message.reply(getLang("missingIdRemove"));
			}
			case "list":
			case "-l": {
				const getNames = await Promise.all(config.whiteListMode.whiteListIds.map(uid => usersData.getName(uid).then(name => ({ uid, name }))));
				return message.reply(getLang("listAdmin", getNames.map(({ uid, name }) => `• ${name} (${uid})`).join("\n")));
			}
        case "on": {              
   config.whiteListMode.enable = true;
                writeFileSync(global.client.dirConfig, JSON.stringify(config, null, 2));
                return message.reply(getLang("enable"))
            }
            case "off": {
   config.whiteListMode.enable = false;
                writeFileSync(global.client.dirConfig, JSON.stringify(config, null, 2));
                return message.reply(getLang("disable"))
            }
            default:
                return message.SyntaxError();
        }
    }
};
const wrapper = new GoatWrapper(module.exports); wrapper.applyNoPrefix({ allowPrefix: true });
