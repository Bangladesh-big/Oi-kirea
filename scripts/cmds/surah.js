module.exports = {
	config: {
		name: "surah",
		version: "1.0",
		author: "SK-SIDDIK-KHAN",
		countDown: 5,
		role: 0,
		category: "user",
	},
 
	 onStart: async function ({ api, event, message }) {
    const senderID = event.senderID;
 
    const loadingMessage = await message.reply({
      body: "Loading Islamic Surah... Please Wait ⏰",
    });
     
	 var link = [
 
  "https://drive.google.com/uc?id=1aY59cnUVgZlYln62YrgPmd4nnlAWNJM6",

  "https://drive.google.com/uc?id=1ahTLNirAhkqJYpqqRR1NRLUj0SpOZ47m",

  "https://drive.google.com/uc?id=1adwI3F78Kt2bhjBi0nLJCmGi7YkIa_oP",

  "https://drive.google.com/uc?id=1acH8zkkiqtVF8pqzHZdWElV-RNhvxUcX",

  "https://drive.google.com/uc?id=1b1wdz2Tq8h7V6yELgRQCph-A_d5MJb24",

  "https://drive.google.com/uc?id=1aw1Yc_WjPo_-WsAiAZLyUiYIiN50p8YR",

  "https://drive.google.com/uc?id=1aWCTg4wrAx80RekEBXUqR9A1vdfN6G-R",

  "https://drive.google.com/uc?id=1ar0LU-O-jQDRf5Nym2NPd0glYcNYHdcx",

  "https://drive.google.com/uc?id=1b4TnpZGumcf0abAJutXGG440df5YaUF5",

  "https://drive.google.com/uc?id=1aP2ZbPUTo1fUPxvQux8uDafDySCn6UNq",

  "https://drive.google.com/uc?id=1aTR9pfPzVRIPs0I20xDOTjpjvoQKWc6C",

  "https://drive.google.com/uc?id=1b1QeqyV05PnMh7_D1ZvK0MgvneOt09J5",

  "https://drive.google.com/uc?id=1bB8s9nOk4yuLBCPjShq8oWwY_hhPhOBN",

  "https://drive.google.com/uc?id=1aGze_EzHxc9VglBtaNPxFoudYEA9ZBrE",

  "https://drive.google.com/uc?id=1b9ZZ4TT-L6JYkIl8xxkqxq0ORUtBGh4X",

  "https://drive.google.com/uc?id=1b5gGUDH6Sw1tIMxiSSbRsOtMAGycbZjL",

  "https://drive.google.com/uc?id=1aAmtIPaSAhO6dgxOjCGbl1Z_RTJB3TWC",

  "https://drive.google.com/uc?id=1bDG1l-qNKCpq7mddaerMQaB8imLRBE3p",

  "https://drive.google.com/uc?id=1aDjnHvr20Ly10oTJcf9zhIW6IXCUtbev",

  "https://drive.google.com/uc?id=1bKfPU0VxiA5gdgkBdkj_SYXZTWYfnEky",

  "https://drive.google.com/uc?id=1a3fcbKmdSpUU7v3fb7rbjk1vIDW0OPnQ",
 
 ];
     let audio = link[Math.floor(Math.random()*link.length)]

   if (senderID !== null) {
      message.reply({
        body: '•Present By Sk Siddik•',
        attachment: await global.utils.getStreamFromURL(audio)
      });
 
      setTimeout(() => {
        api.unsendMessage(loadingMessage.messageID);
      }, 800);
    }
  },
};
