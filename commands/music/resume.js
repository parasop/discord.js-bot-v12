module.exports = {
        name: 'resume',
        
    run: async (client, message, args) => {
        const { channel } = message.member.voice;
        if (!channel) { message.channel.send("MUST JOIN VC BEFORE USING THIS COMMAND!")
                       }
        const serverQueue = client.queue.get(message.guild.id);
        if (message.guild.me.voice.channel !== message.member.voice.channel) {
            return message.channel.send("JOIN MY VOICE CHANNEL IF YOU WANT USE ME!");
        }
      try {
        if (serverQueue && !serverQueue.playing) {
            serverQueue.playing = true;
            serverQueue.connection.dispatcher.resume();
            return message.channel.send({embed:{
color: "BLUE",                                       description:'▶ **Resumed**'}});
        }
        return message.channel.send('**There is nothing to resume**.');
      } catch {
        serverQueue.connection.dispatcher.end();
        return message.channel.send("**TRY AGAIN**")
      }
    }
};