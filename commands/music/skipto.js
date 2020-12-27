module.exports = {
  name: "skipto",

  run: async (client, message, args) => {
    if (!args[0])
      return message.channel.send("**Please Enter A Song Number!**");

    const { channel } = message.member.voice;
    if (!channel) return message.channel.send("JOIN VOICE CHANNEL!");
    const serverQueue = client.queue.get(message.guild.id);
    if (!serverQueue) {
      message.channel.send("Nothing playing in this server");
    }

    if (message.guild.me.voice.channel !== message.member.voice.channel) {
      return message.channel.send(
        "You Have To Be In The Same Channel With The Bot!"
      );
    }

    if (args[0] < 1 && args[0] >= serverQueue.songs.length) {
      return message.channel.send("**Please Enter A Valid Song Number!**");
    }
    try {
      serverQueue.songs.splice(0, args[0] - 2);
      serverQueue.connection.dispatcher.end();
      return;
    } catch {
      serverQueue.connection.dispatcher.end();
      await channel.leave();
      return message.channel.send("PLEASE TRY AGAIN");
    }
  }
};
