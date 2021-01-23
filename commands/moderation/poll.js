
const Discord = require("discord.js");

module.exports = {
  name: "poll",
  aliases: ["pll"],
  category: "Moderation",
  description: "Create A Fresh Poll!",
  usage: "Poll <Channel> <Message>",
  run: async (client, message, args) => {
 
    const Channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);

    if (!Channel || Channel.type === "voice") return message.channel.send("Please Mention Or Give ID Of A Valid Text Channel!");

    const Msg = args.slice(1).join(" ");

    if (!Msg) return message.channel.send("Please Give Poll Message!");

    const Embed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setTitle("Poll!")
    .setDescription(Msg)
    .setTimestamp();

    try {
      return message.channel.send(Embed) && message.channel.send("Poll Has Been Created!");
    } catch (error) {
      return message.channel.send("Unable To Create Poll, Maybe I Don't Have Permission Or Something Else!");
    };
  }
};
