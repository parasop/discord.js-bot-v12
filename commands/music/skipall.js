module.exports = {
        name: 'skipall',
        aliases: ['skip-all'],
       run: async (client, message, args) => {
        const { channel } = message.member.voice;
        if (!channel) return message.channel.send('I\'m sorry but you need to be in a voice channel to skip music!');
        if (message.guild.me.voice.channel !== message.member.voice.channel) {
            return message.channel.send("**You Have To Be In The Same Channel With The Bot!**");
          }
        const serverQueue = client.queue.get(message.guild.id);
        if (!serverQueue) return message.channel.send("Nothing playing in this server");
        if (!serverQueue.songs) return message.channel.send("There are No Songs In The Queue!");
      try {
        serverQueue.songs = [];
        serverQueue.connection.dispatcher.end();
        return message.channel.send("✅Skipped All Songs**");
      } catch {
          serverQueue.connection.dispatcher.end();
          await channel.leave();
          return message.channel.send("TRY AGAIN");
      }
    }
};