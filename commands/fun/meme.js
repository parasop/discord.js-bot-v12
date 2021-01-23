
const Fetch = require("node-fetch");
const Discord = require("discord.js");

module.exports = {
  name: "meme",
  aliases: ["mm"],
  category: "Fun",
  description: "Return A Random Meme!",
  usage: "Meme",
  run: async (client, message, args) => {
    
    const Response = await Fetch("https://api.darkboy.me/getmeme");
    const Json = await Response.json();

    if (!Json.title) return message.channel.send("Your Life Lmafao");

    const Embed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setTitle(Json.title)
    .setImage(Json.image)
    .setFooter(`${Json.up} 👍 | ${Json.comments} 💬`)
    .setTimestamp();

    return message.channel.send(Embed);
  }
};
