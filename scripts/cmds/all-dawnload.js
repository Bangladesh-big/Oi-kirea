const fs = require("fs-extra");
const axios = require("axios");
const cheerio = require("cheerio");
const qs = require("qs");
const { getStreamFromURL, shortenURL, randomString } = global.utils;

module.exports = {
  threadStates: {},
  config: {
    name: "autolink",
    version: "3.0",
    author: "Vex_Kshitiz",
    countDown: 5,
    role: 0,
    shortDescription: "Auto video downloader for Instagram, Facebook, TikTok, Twitter, Pinterest, and YouTube",
    longDescription: "",
    category: "media",
    guide: {
      en: "{p}{n}",
    },
  },
  onChat: async function ({ api, event }) {
    if (this.checkLink(event.body)) {
      const { url } = this.checkLink(event.body);
      console.log(`Attempting to download from URL: ${url}`);

      api.setMessageReaction("⏰", event.messageID, (err) => {}, true); 
      this.downLoad(url, api, event);
    }
  },
  downLoad: function (url, api, event) {
    const time = Date.now();
    const path = __dirname + `/cache/${time}.mp4`;

    if (url.includes("instagram")) {
      this.downloadInstagram(url, api, event, path);
    } else if (url.includes("facebook") || url.includes("fb.watch")) {
      this.downloadFacebook(url, api, event, path);
    } else if (url.includes("tiktok")) {
      this.downloadTikTok(url, api, event, path);
    } else if (url.includes("x.com")) {
      this.downloadTwitter(url, api, event, path);
    } else if (url.includes("pin.it")) {
      this.downloadPinterest(url, api, event, path);
    } else if (url.includes("youtu")) {
      this.downloadYouTube(url, api, event, path);
    }
  },
  downloadInstagram: async function (url, api, event, path) {
    try {
      const res = await this.getLink(url, api, event, path);
      const response = await axios({
        method: "GET",
        url: res,
        responseType: "arraybuffer",
      });
      fs.writeFileSync(path, Buffer.from(response.data, "utf-8"));

      if (fs.statSync(path).size / 1024 / 1024 > 25) {
        return api.sendMessage("The file is too large, cannot be sent", event.threadID, () => fs.unlinkSync(path), event.messageID);
      }

      api.setMessageReaction("✅", event.messageID, (err) => {}, true); 

      const shortUrl = await shortenURL(res);
      const messageBody = `🔗 Download Link: ${shortUrl}`;

      api.sendMessage(
        {
          body: messageBody,
          attachment: fs.createReadStream(path),
        },
        event.threadID,
        () => fs.unlinkSync(path),
        event.messageID
      );
    } catch (err) {
      console.error(err);
    }
  },
  checkLink: function (url) {
    if (
      url.includes("instagram") ||
      url.includes("facebook") ||
      url.includes("fb.watch") ||
      url.includes("tiktok") ||
      url.includes("x.com") ||
      url.includes("pin.it") ||
      url.includes("youtu")
    ) {
      return { url: url };
    }

    const fbWatchRegex = /fb\.watch\/[a-zA-Z0-9_-]+/i;
    if (fbWatchRegex.test(url)) {
      return { url: url };
    }

    return null;
  },
  getLink: function (url, api, event, path) {
    return new Promise((resolve, reject) => {
      if (url.includes("instagram")) {
        axios({
          method: "GET",
          url: `https://insta-downloader-ten.vercel.app/insta?url=${encodeURIComponent(url)}`,
        })
          .then((res) => {
            console.log(`API Response: ${JSON.stringify(res.data)}`);
            if (res.data.url) {
              resolve(res.data.url);
            } else {
              reject(new Error("Invalid response from the API"));
            }
          })
          .catch((err) => reject(err));
      } else {
        reject(new Error("Unsupported platform."));
      }
    });
  },
};
