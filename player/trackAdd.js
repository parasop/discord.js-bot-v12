const discord = require("discord.js")
module.exports = (client, message, queue, track) => {

const paras = new discord.MessageEmbed()
.setTitle(`🎸 Added to queue `)
.setDescription(`
${track.title}
`)
  message.channel.send(paras);
}