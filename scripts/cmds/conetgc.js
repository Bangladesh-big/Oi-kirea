let connectedThreadID;
const { getStreamsFromAttachment, log } = global.utils;
const mediaTypes = ["photo", "png", "animated_image", "video", "audio"];

module.exports = {
    config: {
        name: "contekgc",
        author: "SK-SIDDIK-KHAN",
        version: "1.1",
        role: 0,
        description: "Connects and forwards messages between group chats.",
        category: "utility"
    },

    onStart: async function ({ args, message, event, api, commandName }) {
        if (args.length < 2)
            return message.reply("Please provide a message and a group UID.");

        const msg = args.slice(0, -1).join(" ");
        const gcUid = args[args.length - 1];

        connectedThreadID = gcUid;

        const filteredAttachments = event.attachments?.filter(item => mediaTypes.includes(item.type)) || [];
        const attachments = await getStreamsFromAttachment(filteredAttachments) || [];

        const formMessage = {
            body: msg,
            attachment: attachments.length > 0 ? attachments : undefined
        };

        try {
            const messageSend = await api.sendMessage(formMessage, gcUid);

            global.GoatBot.onReply.set(messageSend.messageID, {
                originalThreadID: event.threadID,
                originalSenderID: event.senderID,
                commandName
            });

            return message.reply("┏━━━━━━━━━━━━━━━━━┓\n┣➤ Successfully sent message\n┗━━━━━━━━━━━━━━━━━┛");
        } catch (error) {
            console.error("Error sending message:", error);
            return message.reply("┏━━━━━━━━━━━━━━━━━┓\n┣➤ Failed to send message\n┗━━━━━━━━━━━━━━━━━┛");
        }
    },

    onReply: async function ({ event, api, Reply }) {
        const { originalThreadID, originalSenderID, commandName } = Reply;

        if (!originalThreadID || !originalSenderID)
            return console.error("Reply data missing or corrupted.");

        const senderInfo = await api.getUserInfo(event.senderID);
        const senderName = senderInfo[event.senderID]?.name || "Unknown User";

        const formMessage = {
            body: `${senderName}: ${event.body}`
        };

        try {
            const filteredAttachments = event.attachments?.filter(item => mediaTypes.includes(item.type)) || [];
            const attachments = await getStreamsFromAttachment(filteredAttachments) || [];
            if (attachments.length > 0) formMessage.attachment = attachments;

            const targetThreadID = originalThreadID === event.threadID ? connectedThreadID : originalThreadID;
            const messageSend = await api.sendMessage(formMessage, targetThreadID);

            global.GoatBot.onReply.set(messageSend.messageID, {
                originalThreadID,
                originalSenderID,
                commandName
            });
        } catch (error) {
            console.error("Error forwarding reply:", error);
        }
    },

    onChat: async function ({ event, api }) {
        if (!connectedThreadID) return;

        try {
            const senderInfo = await api.getUserInfo(event.senderID);
            const senderName = senderInfo[event.senderID]?.name || "Unknown User";

            const formMessage = {
                body: `${senderName}: ${event.body}`
            };

            const filteredAttachments = event.attachments?.filter(item => mediaTypes.includes(item.type)) || [];
            const attachments = await getStreamsFromAttachment(filteredAttachments) || [];
            if (attachments.length > 0) formMessage.attachment = attachments;

            await api.sendMessage(formMessage, connectedThreadID);
        } catch (error) {
            console.error("Error forwarding chat message:", error);
        }
    }
};
