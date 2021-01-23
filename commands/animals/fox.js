const  Random = require("srod-v2");
const Discord = require("discord.js");

module.exports = {
  name: "fox",
  aliases: [],
  category: "Image",
  description: "Return A Random Fox!",
  usage: "Fox",
  run: async (client, message, args) => {
    
    const Data = await Random.GetAnimalImage({ Animal: "fox", Color: "RANDOM" });
    return message.channel.send(Data);
  }
};
