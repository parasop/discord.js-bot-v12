module.exports = {
        name: 'volume',
        aliases: ["vol"],
       run: async (client, message, args) => {
        const { channel } = message.member.voice;
        if (!channel) return message.channel.send("JOIN VOICE CHANNEL!");
        if (message.guild.me.voice.channel !== message.member.voice.channel) {
            return message.channel.send("You Have To Be In The Same Channel With The Bot!");
          }
        const serverQueue = client.queue.get(message.guild.id);
        if (!serverQueue){message.channel.send("There is nothing playing!")}
        if (!args[0]) return message.channel.send(`The current volume is: **${serverQueue.volume}**`);
      try {
        serverQueue.volume = args[0];
        serverQueue.connection.dispatcher.setVolumeLogarithmic(args[0] / 5);
        return message.channel.send(`I have set the volume to **${args[0]}**`);
      } catch {
          return message.channel.send("TRY AGAIN!");
      }
    }
};