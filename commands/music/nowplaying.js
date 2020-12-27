const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "nowplaying",
    aliases: ["np"],

  run: async (client, message, args) => {
    const serverQueue = client.queue.get(message.guild.id);
    if (!serverQueue) {
      message.channel.send("There is nothing playing in this server.");
      let song = serverQueue.songs[0];
      let np = new MessageEmbed()
        .setAuthor("😀NOW PLAYING😀")
        .setThumbnail(song.img)
        .setColor("RANDOM")
        .addField("Name", song.title, true)
        .addField("Duration", song.duration, true)
        .addField("Requested by", song.req.tag, true)
        .setFooter(`${message.guild} PLAYER`);
      return message.channel.send(np);
    }
  }
};
