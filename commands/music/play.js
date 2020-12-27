const { Util, MessageEmbed } = require("discord.js");
//const { GOOGLE_API_KEY } = require('../../config');
const YouTube = require("simple-youtube-api");
const youtube = new YouTube(process.env.API);
const ytdl = require("ytdl-core");

module.exports = {
  name: "play",
  aliases: ["p"],
  run: async (client, message, args) => {
    if (!args[0]) return message.channel.send("PROVIDE US SONG NAME OR LINK ");
    args = message.content.split(" ");
    const searchString = args.slice(1).join(" ");
    const url = args[1] ? args[1].replace(/<(.+)>/g, "$1") : "";

    const { channel } = message.member.voice;
    if (!channel)
      return message.channel.send(
        "MUST JOIN VOICE CHANNEL BEFORE USING THIS COMMAND"
      );

    const permissions = channel.permissionsFor(message.client.user);
    if (!permissions.has("CONNECT")) {
      message.channel.send(" I DON'T HAVE PERMISSION TO CONNECT YOUR VC");
    }
    if (!permissions.has("SPEAK")) {
      message.channel.send(
        "I DON'T HAVE PERMISSION TO PLAY SONG IN YOUR VOICE CHANNEL"
      );
    }
    if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
      const playlist = await youtube.getPlaylist(url);
      const videos = await playlist.getVideos();

      for (const video of Object.values(videos)) {
        const video2 = await youtube.getVideoByID(video.id);
        await handleVideo(video2, message, channel, true);
      }
      return message.channel.send(
        `**Playlist \`${playlist.title}\` has been added to the queue!**`
      );
    } else {
      try {
        var video = await youtube.getVideo(url);
      } catch (error) {
        try {
          var videos = await youtube.searchVideos(searchString, 1);
          var video = await youtube.getVideoByID(videos[0].id);
        } catch (err) {
          console.error(err);
          return message.channel.send("CANNOT FIND TRY AGAIN");
        }
      }
      return handleVideo(video, message, channel);
    }
    async function handleVideo(video, message, channel, playlist = false) {
      const serverQueue = client.queue.get(message.guild.id);
      const songInfo = await ytdl.getInfo(video.id);
      const song = {
        id: video.id,
        title: Util.escapeMarkdown(video.title),
        url: `https://www.youtube.com/watch?v=${video.id}`,
        thumbnail: `https://i.ytimg.com/vi/${video.id}/maxresdefault.jpg`,
        duration: video.duration,
        time: songInfo.videoDetails.lengthSeconds
      };

      if (serverQueue) {
        serverQueue.songs.push(song);
        if (playlist) return undefined;
        else {
          const sembed = new MessageEmbed()
            .setColor("GREEN")
            .setTitle("Added To Queue")
            .setImage(song.thumbnail)
            .setTimestamp()
            .setDescription(
              `
   SONG NAME                         **${song.title}** 
   
Requested By **${message.author.username}**`
            )
            .setFooter(
              message.member.displayName,
              message.author.displayAvatarURL()
            );
          message.channel.send(sembed);
        }
        return undefined;
      }

      const queueConstruct = {
        textChannel: message.channel,
        voiceChannel: channel,
        connection: null,
        songs: [],
        volume: 2.5,
        playing: true,
        loop: false
      };
      client.queue.set(message.guild.id, queueConstruct);
      queueConstruct.songs.push(song);
      try {
        const connection = await channel.join();
        queueConstruct.connection = connection;
        play(queueConstruct.songs[0]);
      } catch (error) {
        console.error(`I could not join the voice channel: ${error.message}`);
        client.queue.delete(message.guild.id);
        await channel.leave();
        return message.channel.send(
          `I could not join the voice channel: ${error.message}`
        );
      }
    }
    async function play(song) {
      const queue = client.queue.get(message.guild.id);
      if (!song) {
        queue.voiceChannel.leave();
        //remove line for 24/7  vc
        client.queue.delete(message.guild.id);
        return;
      }

      let npmin = Math.floor(song.time / 60);
      let npsec = song.time - npmin * 60;
      let np = `${npmin}:${npsec}`.split(" ");

      const dispatcher = queue.connection
        .play(
          ytdl(song.url, { highWaterMark: 1 << 20, quality: "highestaudio" })
        )
        .on("finish", () => {
          if (queue.loop) {
            queue.songs.push(queue.songs.shift());
            return play(queue.songs[0]);
          }
          queue.songs.shift();
          play(queue.songs[0]);
        })
        .on("error", error => console.error(error));
      dispatcher.setVolumeLogarithmic(queue.volume / 5);
      const embed = new MessageEmbed()
        .setColor("GREEN")
        .setTitle("Now Playing")
        .setImage(song.thumbnail)
        .setTimestamp()
        .setDescription(
          `
Now playing:
**${song.title}** 
Song Length: 
**${np}** `
        )
        .setFooter(
          `Requested by: ${message.member.displayName}`,
          message.author.displayAvatarURL()
        );
      queue.textChannel.send(embed);

      //let's test our bot
    }
  }
};
