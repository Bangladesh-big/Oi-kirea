module.exports = {
    config: {
      name: "supportgc",
      aliases: ["helpbox", "support group"],
      version: "1.1",
      author: "SK-SIDDIK",
      countDown: 5,
      role: 0,
      shortDescription: {
        en: "Join the support group chat"
      },
      longDescription: {
        en: "Join the official support group chat"
      },
      category: "General",
      guide: {
        en: "{pn}"
      }
    },
  
    onStart: async function ({ api, event, threadsData, getLang, message }) {
      const supportGroupThreadID = "8633920226631307";
      const botID = api.getCurrentUserID();
  
      try {
        const { members } = await threadsData.get(supportGroupThreadID);
  
        const senderName = event.senderName || (await api.getUserInfo(event.senderID))[event.senderID].name;
        const userAlreadyInGroup = members.some(
          member => member.userID === event.senderID && member.inGroup
        );
  
        if (userAlreadyInGroup) {
          const alreadyInGroupMessage = `
  🚫 আপনি ইতিমধ্যেই SupportGc গ্রুপের সদস্য🚫
  ------------------------
          `;
          return message.reply(alreadyInGroupMessage);
        }
  
        await api.addUserToGroup(event.senderID, supportGroupThreadID);
  
        const successMessage = `
  🎉 আপনাকে সফলভাবে SupportGc তে যুক্ত করা হয়েছে 🎉
  ------------------------
        `;
        return message.reply(successMessage);
      } catch (error) {
       
        const senderName = event.senderName || (await api.getUserInfo(event.senderID))[event.senderID].name;
        const failedMessage = `
  ❌ আপনাকে SopportGc তে এড করতে ব্যর্থ হয়েছি😞।আপনি আমায় ফ্রেন্ড রিকোয়েস্ট পাঠান অথবা আপনার প্রোফাইল আনলক করুন এবং আবার চেষ্টা করুন ❌
  ------------------------
        `;
        console.error("Error adding user to support group:", error);
        return message.reply(failedMessage);
      }
    }
  };