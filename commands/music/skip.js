module.exports = {
        name: 'skip',
        run: async (client, message, args) => {
        const { channel } = message.member.voice;
        if (!channel) return message.channel.send("JOIN VOICE CHANNEL BEFORE USING THIS COMMAND!");
        if (message.guild.me.voice.channel !== message.member.voice.channel) {
            return message.channel.send("JOIN MY VOICE CHANNEL IF YOU WANT USE ME!");
          }
        const serverQueue = client.queue.get(message.guild.id);
        if (!serverQueue) return message.channel.send("❌ **Nothing playing in this server");
      try {
        serverQueue.connection.dispatcher.end();
        return message.channel.send({
          embed:{
          color: "BLUE",
          description:"⏩ Skipped"
          }})
      } catch {
          serverQueue.connection.dispatcher.end();
          await channel.leave();
          return message.channel.send("TRY AGAIN TO SKIP")
      }
    }
};