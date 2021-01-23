const api = require("srod-v2");
const Discord = require("discord.js");

module.exports = {
  name: "advice",
  aliases: [],
  category: "Fun",
  description: "Return A Random Advice!",
  usage: "Advice",
  run: async (client, message, args) => {
    
    const Data = await api.GetAdvice({ Color: "RANDOM" });
    return message.channel.send(Data);
  }
};
