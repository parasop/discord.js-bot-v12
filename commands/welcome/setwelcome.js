module.exports = {
	name: "setchannel",
	run : async (client,message,args)=> {


let channel = message.mentions.channels.first()



if(!channel){
	message.reply(`mention welcome channel`)
}


client.db.set(`channel_${message.guild.id}`,channel.id)



message.channel.send(`${channel} has been seted as a welcome channel`)






	}
}