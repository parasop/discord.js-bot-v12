const discord = require("discord.js");

module.exports = {
  name: "setwelcome",
  run: async (client, message, args) => {
    if (!message.member.hasPermission("ADMINISTRATOR")) {
      message.channel.send("YOU DON'T HAVE PERMISSION!");
    }

    let channel = message.mentions.channels.first();
    if (!channel) {
      message.channel.send("PLEASE MENTION SPECIFIC CHANNEL");
    }
    client.db.set(`welcome_${message.guild.id}`, channel.id);

    message.channel.send(`WELCOME  CHANNEL SETED AS A ${channel}`);
  }
};
