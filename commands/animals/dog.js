
const  Random = require("srod-v2");
const Discord = require("discord.js");

module.exports = {
  name: "dog",
  aliases: [],
  category: "Image",
  description: "Return A Random Dog!",
  usage: "Dog",
  run: async (client, message, args) => {
    
    const Data = await Random.GetAnimalImage({ Animal: "dog", Color: "RANDOM" });
    return message.channel.send(Data);
  }
};
