const Discord = require("discord.js");
const canvacord = require("canvacord");
const Levels = require("discord-xp");
module.exports = {
  name: "rank",
 run: async (client, message, args) => {

let rank = await Levels.fetch(message.author.id,message.guild.id)



if(!rank){
    return message.channel.send(`looks like you have 0 xp`)
}

let requiredXp =await Levels.xpFor(Number(rank.level)+ 1)
let rankCard = new canvacord.Rank()

.setAvatar(message.author.displayAvatarURL({dynamic : false,format : "png"})) //its flase because its does not support animated avatar

.setCurrentXP(rank.xp)
.setRequiredXP(requiredXp)
.setLevel(rank.level)
.setStatus(message.member.presence.status)
.setProgressBar("RED", "COLOR")
.setUsername(message.author.username)
.setDiscriminator(message.author.discriminator)
.setRank(rank.rank + 1)

rankCard.build().then((data) => {
let attach = new Discord.MessageAttachment(data,'rank.png')


message.channel.send({files: [attach]})

})

  },
};