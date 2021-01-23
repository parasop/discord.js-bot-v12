
const Random = require("srod-v2");
const Discord = require("discord.js");

module.exports = {
  name: "feed",
  aliases: [],
  category: "Image",
  description: "Return A Random Feed!",
  usage: "Feed",
  run: async (client, message, args) => {

    const Data = await Random.GetAnimeImage({ Anime: "feed", Color: "RANDOM" });
    
    return message.channel.send(Data);
  }
};
