const api = require("srod-v2");
const Discord = require("discord.js");

module.exports = {
  name: "topic",
  aliases: [],
  category: "Fun",
  description: "Return A Random Topic!",
  usage: "Topic",
  run: async (client, message, args) => {
    
    const Data = await api.GetTopic({ Color: "RANDOM" });
    return message.channel.send(Data);
  }
};
