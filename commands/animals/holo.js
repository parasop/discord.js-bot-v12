
const Random = require("srod-v2");
const Discord = require("discord.js");

module.exports = {
  name: "holo",
  aliases: [],
  category: "Image",
  description: "Return A Random Holo!",
  usage: "Holo",
  run: async (client, message, args) => {

    const Data = await Random.GetAnimeImage({ Anime: "holo", Color: "RANDOM" });
    
    return message.channel.send(Data);
  }
};
