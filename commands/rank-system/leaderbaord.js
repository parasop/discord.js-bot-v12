const Levels = require("discord-xp")
const discord = require("discord.js");

module.exports = {
  name: "leaderboard",
  aliases: ["lb"],
  run: async (client, message, args) => {


let raw = await Levels.fetchLeaderboard(message.guild.id, 10) // first 10 members

if(raw.ength < 1){
    return message.channel.send(`there is o member on leaderboard`
    
    )
}
let leaderboard = await Levels.computeLeaderboard(client,raw,true)



let rankMap = leaderboard.map((rank)=> ` ${rank.position} | ${rank.username} | level :- ${rank.level} | xp :- ${rank.xp.toString()}`)




let embed = new discord.MessageEmbed()

.setAuthor(`${message.guild.name} Leaderboard`,message.guild.iconURL()

)
.setColor("FF0000")
.setDescription(rankMap.join("\n")
)

message.channel.send(embed)











  }
};