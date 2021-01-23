
const  Random = require("srod-v2");
const Discord = require("discord.js");

module.exports = {
  name: "panda",
  aliases: [],
  category: "Image",
  description: "Return A Random Panda!",
  usage: "Panda",
  run: async (client, message, args) => {
    
    const Data = await Random.GetAnimalImage({ Animal: "panda", Color: "RANDOM" });
    return message.channel.send(Data);
  }
};
