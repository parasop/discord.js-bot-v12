
const api = require("srod-v2");
const Discord = require("discord.js");

module.exports = {
  name: "fact",
  aliases: [],
  category: "Fun",
  description: "Return A Random Fact!",
  usage: "Fact",
  run: async (client, message, args) => {

    console.log(client.commands.size)
    
    const Data = await api.GetFact({ Color: "random" });
    return message.channel.send(Data);
  }
};
