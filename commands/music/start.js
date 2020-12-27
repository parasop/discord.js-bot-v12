const { Util, MessageEmbed } = require("discord.js");
const ytdl = require("ytdl-core");
const yts = require("yt-search");

module.exports = {
  name: "play",
  description: "To play songs :D",
  usage: "<song_name>",
  aliases: ["p"],

  run: async function(client, message, args) {
    const channel = message.member.voice.channel;
    if (!channel) {
      message.channel.send("I am sorry but you need to be in a voice channel before using this commamd");
    }

    if (!message.guild.me.hasPermission("CONNECT")) {
      message.channel.send({
        embed: {
          color: "FF0000",
          description:
            "<:emoji_17:763367241327706118> I don't have permission to connect your vc!"
        }
      });
    }
    if (!message.guild.me.hasPermission("SPEAK")) {
      message.channel.send({
        embed: {
          color: "FF0000",
          description:
            "<:emoji_17:763367241327706118>I need speak permission for playing music!"
        }
      });
    }
    var searchString = args.join(" ");
    if (!searchString) {
      message.channel.send("<:emoji_17:763367241327706118>provide us song' name or song's link");
    }

    var serverQueue = message.client.queue.get(message.guild.id);

    var searched = await yts.search(searchString);
    if (searched.videos.length === 0) {
      message.channel.send("I can't find that song");
    }
    var songInfo = searched.videos[0];

    const song = {
      id: songInfo.videoId,
      title: Util.escapeMarkdown(songInfo.title),
      views: String(songInfo.views).padStart(10, " "),
      url: songInfo.url,
      ago: songInfo.ago,
      duration: songInfo.duration.toString(),
      img: songInfo.image,
      req: message.author
    };

    if (serverQueue) {
      serverQueue.songs.push(song);
      let thing = new MessageEmbed()
        .setTitle("SONG HAS BEEN ADDED TO QUEUE")
        .setImage(song.img)
        .setColor("ORANGE")
        .setDescription(
          `**SONG NAME**   
[${song.title}](${song.url})     

**DURACTION**
${song.duration}

**REQUEST BY**
[${message.author}]


        
        
        `
        )
        .setFooter(`PARAS GAMING 🇮🇳`);
      return message.channel.send(thing);
    }

    const queueConstruct = {
      textChannel: message.channel,
      voiceChannel: channel,
      connection: null,
      songs: [],
      volume: 3.5,
      playing: true
    };
    message.client.queue.set(message.guild.id, queueConstruct);
    queueConstruct.songs.push(song);

    const play = async song => {
      const queue = message.client.queue.get(message.guild.id);
      if (!song) {
         message.client.queue.delete(message.guild.id);
        return;
      }

      const dispatcher = queue.connection
        .play(ytdl(song.url))
        .on("finish", () => {
          queue.songs.shift();
          play(queue.songs[0]);
        })
        .on("error", error => console.error(error));
      dispatcher.setVolumeLogarithmic(queue.volume / 5);
      let thing = new MessageEmbed()
        .setTitle("START PLAYING")
        .setDescription(
          `
**SONG NAME**   
[${song.title}](${song.url})     

**DURACTION**
${song.duration}

**REQUEST BY**
[${message.author}]
`
        )

        .setImage(song.img)
        .setColor("GREEN")
        .setFooter(`PARAS GAMING🇮🇳`);
      queue.textChannel.send(thing);
    };

    try {
      const connection = await channel.join();
      queueConstruct.connection = connection;
      channel.guild.voice.setSelfDeaf(true);
      play(queueConstruct.songs[0]);
    } catch (error) {
      console.error(`I could not join the voice channel: ${error}`);
      message.client.queue.delete(message.guild.id);
      //await channel.leave();
      return console.log(
        `I could not join the voice channel: ${error}`,
        message.channel
      );
    }
  }
};