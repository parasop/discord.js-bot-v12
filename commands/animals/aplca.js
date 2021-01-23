const api  = require("srod-v2");
const Discord = require("discord.js");

module.exports = {
  name: "alpaca",
  aliases: [],
  category: "Image",
  description: "Return A Random Alpaca!",
  usage: "Alpaca",
  run: async (client, message, args) => {
    
    const Data = await api.GetAnimalImage({ Animal: "alpaca", Color: "RANDOM" });
    return message.channel.send(Data);
  }
};
