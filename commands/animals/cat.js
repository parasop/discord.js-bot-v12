
const Color = "RANDOM", Random = require("srod-v2");
const Discord = require("discord.js");

module.exports = {
  name: "cat",
  aliases: [],
  category: "Image",
  description: "Return A Random Cat!",
  usage: "Cat",
  run: async (client, message, args) => {
    
    const Data = await Random.GetAnimalImage({ Animal: "cat", Color: "RANDOM" });
    return message.channel.send(Data);
  }
};
