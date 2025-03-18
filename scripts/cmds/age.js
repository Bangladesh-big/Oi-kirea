module.exports = {
  config: {
    name: "age",
    author: "Samir Œ", //Modify By Sk Siddik Khan
    countDown: 5,
    role: 0,
    category: "write",
    shortDescription: {
      en: "mention your friend and write something to post✍️",
    },
  },
 
  onStart: async function ({ api, event, args }) {
    const birthday = args[0];
 
    if (!birthday) {
      return api.sendMessage("আপনার বয়স দিতে হবে বছর-মাস-দিন", event.threadID);
    }
 
    const currentDate = new Date();
    const birthDate = new Date(birthday);

    let age = currentDate.getFullYear() - birthDate.getFullYear();
    const monthDifference = currentDate.getMonth() - birthDate.getMonth();
    const dayDifference = currentDate.getDate() - birthDate.getDate();

    // Adjust if birthday hasn't occurred yet this year
    if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
      age--;
    }

    api.sendMessage(`আপনার বয়স = ${age} বছর`, event.threadID);
  },
};
