const discord = require("discord.js");

module.exports = {
  name: "help",
  run: async (client, message, args) => {
    const embed = new discord.MessageEmbed()

      .setTitle(`${client.user.username} HELP MENU`)

      .setThumbnail(
        message.author.displayAvatarURL({ dynamic: true, size: 1024 })
      )

      .setDescription(
        `

**MUSIC COMMANDS**
\`play[p],search,pause,resume,stop,skip,skipall,skipto,nowplaying[np],queue,loop,remove,volume\`


**INFO COMMANDS**
\`ping,help\`

__**ABOUT BOT**__
A POWERFUL MUSIC BOT MADE 24/7 MUSIC PLAYERS 
13+ COMMANDS
`
      )
      .setFooter(message.guild);
    message.channel.send(embed);
  }
};
