const  Random = require("srod-v2");
const Discord = require("discord.js");

module.exports = {
  name: "duck",
  aliases: [],
  category: "Image",
  description: "Return A Random Duck!",
  usage: "Duck",
  run: async (client, message, args) => {
    
    const Data = await Random.GetAnimalImage({ Animal: "duck", Color: "RANDOM" });
    return message.channel.send(Data);
  }
};
