const discord = require("discord.js");



module.exports = {
    name : "snipe",
    run : async (client,message,args)=> {

let snipe = client.snipes.get(message.channel.id)

if(!snipe) {
  return   message.reply("THERE IS NO DELETED MESSAGE ")
}



let embed = new discord.MessageEmbed()

.setTitle(snipe.author)

.addField("MESSAGE CONTENT",snipe.content || "none")
if(snipe.image)embed.setImage(snipe.image);
message.channel.send(embed)
    }
}