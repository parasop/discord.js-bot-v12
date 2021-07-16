let discord = require("discord-buttons")

module.exports = {
	name: "menu",
	run: async (client,message,args)=> {


let test = new discord.MessageMenuOption()
.setLabel("APPLE")
.setEmoji(`850037974783492136`)
.setValue(`APPLE`)
.setDescription(`OH,you like apple`)

let test2 = new discord.MessageMenuOption()
.setLabel("MANGO")
.setEmoji(`850037974783492136`)
.setValue(`MANGO`)
.setDescription(`OH,you like mango`)


let test3 = new discord.MessageMenuOption()
.setLabel("BANANA")
.setEmoji(`850037974783492136`)
.setValue(`BANANA`)
.setDescription(`OH,you like banana`)



let choose = new discord.MessageMenu()



.setPlaceholder(`click here`)
.setID(`LOL`)
.setMaxValues(1)
.setMinValues(1)
.addOption(test)
.addOption(test2)
.addOption(test3);



message.channel.send(`which is your fav fruit`, choose)







	}
}