const discord = require("discord.js")

module.exports = {
    name:"lockdown",
    run : async (client,message) => {

let embed = new discord.MessageEmbed()
.setTitle("LOCKED FULL SERVER")
message.channel.send(embed)


message.guild.channels.cache.filter(channel => channel.name).forEach(async channel => {
    channel.updateOverwrite(message.guild.id,{
SEND_MESSAGES : false



    })
})
    }
}