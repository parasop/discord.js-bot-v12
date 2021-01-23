const discord = require("discord.js");
const db = require("quick.db");
const config = require("../../config.json");
const { relativeTimeThreshold } = require("moment");
const { createCanvas, loadImage, registerFont } = require("canvas");
const guildInvites = new Map();
const path = require("path");


module.exports = {
  name: "welcome",
  description: "Set the server welcome message",
  category: "ADMIN",
  usage: "welcome channel/message/test set/unset/edit",
  run: async (client, message, args) => {
    
    if (!message.member.hasPermission("ADMINISTRATOR")) {
      let embed = new discord.MessageEmbed()
        .setColor(config.error)
        .setDescription(`❌ You don't have permission: \`ADMINISTRATOR\``);

      return message.channel.send(embed);
    }

    if (!args[0]) {
      let embed = new discord.MessageEmbed()
        .setColor(config.error)
        .setDescription(
          `❌ Please select option channel, message, image or test`
        );
      return message.channel.send(embed);
    }

    if (args[0] === "channel") {
      if (!args[1]) {
        let embed = new discord.MessageEmbed()
          .setColor(config.error)
          .setDescription(`❌ Please select option set, unset or edit`);
        return message.channel.send(embed);
      }

      if (args[1] === "set") {
        let ch = db.get(`bluebot_welcomeChannel_${message.guild.id}`);
        if (ch) {
          let embed = new discord.MessageEmbed()
            .setColor(config.error)
            .setDescription(
              `❌ This server has a welcome channnel\n**Note:** if u want to turn off use \`${prefix}welcome channel unset\``
            );
          return message.channel.send(embed);
        }
        let channel =
          message.mentions.channels.first() ||
          message.guild.channels.cache.get(args[2]);
        if (!channel) {
          let embed = new discord.MessageEmbed()
            .setColor(config.error)
            .setDescription(`❌ Please select a channel`);
          return message.channel.send(embed);
        }
        let embed = new discord.MessageEmbed()
          .setColor(config.success)
          .setDescription(`✅ Success seted welcome channel to: ${channel}`);

        message.channel.send(embed).catch(e => {
          if (e.length > 2000) return;

          let embed = new discord.MessageEmbed()
            .setColor(config.error)
            .setDescription(`❌ ${e}`);

          message.channel.send(embed);
        });

        db.set(`bluebot_welcomeChannel_${message.guild.id}`, channel.id);
      }

      if (args[1] === "unset") {
        let text = db.get(`bluebot_welcomeText_${message.guild.id}`);
        let ch = db.get(`bluebot_welcomeChannel_${message.guild.id}`);
        if (!ch) {
          let embed = new discord.MessageEmbed()
            .setColor(config.error)
            .setDescription(
              `❌ First use the command \`${prefix}welcome channel set #channel\``
            );
          return message.channel.send(embed);
        }
        let embed = new discord.MessageEmbed()
          .setColor(config.success)
          .setDescription(`✅ Success unseted welcome pluing`);

        message.channel.send(embed).catch(e => {
          if (e.length > 2000) return;

          let embed = new discord.MessageEmbed()
            .setColor(config.error)
            .setDescription(`❌ ${e}`);

          message.channel.send(embed);
        });
        db.delete(`bluebot_welcomeChannel_${message.guild.id}`);
      }

      if (args[1] === "edit") {
        let channel_id = db.get(`bluebot_welcomeChannel_${message.guild.id}`);
        let channel = message.guild.channels.cache.get(channel_id);
        if (!channel) {
          let embed = new discord.MessageEmbed()
            .setColor(config.error)
            .setDescription(
              `❌ First use the command \`${prefix}welcome channel set #channel\``
            );
          return message.channel.send(embed);
        }
        let new_channel =
          message.mentions.channels.first() ||
          message.guild.channels.cache.get(args[2]);
        if (!new_channel) {
          let embed = new discord.MessageEmbed()
            .setColor(config.error)
            .setDescription(`❌ Please select a new channel`);

          return message.channel.send(embed);
        }
        let embed = new discord.MessageEmbed()
          .setColor(config.success)
          .setDescription(`✅ Success editied the welcome channel`);

        message.channel.send(embed).catch(e => {
          if (e.length > 2000) return;

          let embed = new discord.MessageEmbed()
            .setColor(config.error)
            .setDescription(`❌ ${e}`);

          message.channel.send(embed);
        });
        db.delete(`bluebot_welcomeChannel_${message.guild.id}`);
        db.set(`bluebot_welcomeChannel_${message.guild.id}`, new_channel.id);
      }
    }

    if (args[0] === "message") {
      if (!args[1]) {
        let embed = new discord.MessageEmbed()
          .setColor(config.error)
          .setDescription(`❌ Please select a option: set, unset or edit`);
        return message.channel.send(embed);
      }

      let ch = db.get(`bluebot_welcomeChannel_${message.guild.id}`);

      if (!ch) {
        let embed = new discord.MessageEmbed()
          .setColor(config.error)
          .setDescription(
            `❌ First use the command: \`${prefix}welcome channel set <#channel>\``
          );

        return message.channel.send(embed);
      }

      if (args[1] === "set") {
        let db_tex = db.get(`bluebot_welcomeText_${message.guild.id}`);
        let member = message.member;
        let tex = message.content
          .split(`${prefix}welcome message set `)
          .join("");
        if (db_tex) {
          let embed = new discord.MessageEmbed()
            .setColor(config.error)
            .setDescription(
              `❌ If u want to change use \`${prefix}welcome message edit <message>\` or \`${prefix}welcome message unset\``
            );
          return message.channel.send(embed);
        }
        if (!args[2]) {
          let embed = new discord.MessageEmbed()
            .setColor(config.error)
            .setDescription(
              `❌ Please give the text u want to use in welcome message\n**Note:** For all definytes use \`${prefix}definytes\``
            );
          return message.channel.send(embed);
        }
        let text = tex
          .replace("{server.name}", message.guild.name)
          .replace("{server.member.count}", message.guild.memberCount)
          .replace("{server.id}", message.guild.id)
          .replace(
            "{server.human.count}",
            message.guild.members.cache.filter(m => !m.user.bot).size
          )
          .replace(
            "{server.bot.count}",
            message.guild.members.cache.filter(m => m.user.bot).size
          )
          .replace("{member.name}", member.user.username)
          .replace("{member.mention}", member)
          .replace("{member.tag}", member.user.tag)
          .replace("{member.id}", member.user.id)
          .replace("{member.discriminator}", member.user.discriminator);
        let embed = new discord.MessageEmbed()
          .setColor(config.success)
          .setDescription(`✅ Seted the welcome message to:\n${text}`);

        message.channel.send(embed);
        db.set(`bluebot_welcomeText_${message.guild.id}`, tex);
      }
      if (args[1] === "unset") {
        let tex = db.get(`bluebot_welcomeText_${message.guild.id}`);
        if (!tex) {
          let embed = new discord.MessageEmbed()
            .setColor(config.error)
            .setDescription(
              `❌ First use the command \`${prefix}welcome message set <message>\``
            );
          return message.channel.send(embed);
        }
        let embed = new discord.MessageEmbed()
          .setColor(config.success)
          .setDescription(`✅ Success unseted welcome message`);

        message.channel.send(embed);
        db.delete(`bluebot_welcomeText_${message.guild.id}`);
      }
      if (args[1] === "edit") {
        let member = message.member;
        let tex = message.content
          .split(`${prefix}welcome message edit `)
          .join("");
        if (!args[2]) {
          let embed = new discord.MessageEmbed()
            .setColor(config.error)
            .setDescription(
              `❌ Please give the text u want to use in welcome message\n**Note:** For all definytes use \`${prefix}definytes\``
            );
          return message.channel.send(embed);
        }
        let db_tex = db.get(`bluebot_welcomeText_${message.guild.id}`);
        if (!db_tex) {
          let embed = new discord.MessageEmbed()
            .setColor(config.error)
            .setDescription(
              `❌ First use the command: \`${prefix}welcome message set <message>\``
            );
          return message.channel.send(embed);
        }
        let text = tex
          .replace("{server.name}", message.guild.name)
          .replace("{server.member.count}", message.guild.memberCount)
          .replace("{server.id}", message.guild.id)
          .replace(
            "{server.human.count}",
            message.guild.members.cache.filter(m => !m.user.bot).size
          )
          .replace(
            "{server.bot.count}",
            message.guild.members.cache.filter(m => m.user.bot).size
          )
          .replace("{member.name}", member.user.username)
          .replace("{member.mention}", member)
          .replace("{member.tag}", member.user.tag)
          .replace("{member.id}", member.user.id)
          .replace("{member.discriminator}", member.user.discriminator);
        let embed = new discord.MessageEmbed()
          .setColor(config.success)
          .setDescription(`✅ Success editied the welcome text to:\n${text}`);

        message.channel.send(embed);
        db.delete(`bluebot_welcomeText_${message.guild.id}`);
        db.set(`bluebot_welcomeText_${message.guild.id}`, tex);
      }
    }

    if (args[0] === "image") {
      if (!args[1]) {
        let embed = new discord.MessageEmbed()
          .setColor(config.error)
          .setDescription(`❌ Please select a option: set or unset`);
        return message.channel.send(embed);
      }

      let ch = db.get(`bluebot_welcomeChannel_${message.guild.id}`);

      if (!ch) {
        let embed = new discord.MessageEmbed()
          .setColor(config.error)
          .setDescription(
            `❌ First use the command: \`${prefix}welcome channel set <#channel>\``
          );

        return message.channel.send(embed);
      }

      if (args[1] === "set") {
        let db_image = db.get(`bluebot_welcomeImage_${message.guild.id}`);
        let member = message.member;
        if (db_image) {
          let embed = new discord.MessageEmbed()
            .setColor(config.error)
            .setDescription(
              `❌ If u want to disable this pluing use \`${prefix}welcome image unset\``
            );
          return message.channel.send(embed);
        }

        let embed = new discord.MessageEmbed()
          .setColor(config.success)
          .setDescription(`✅ Seted the welcome image`);

        message.channel.send(embed);
        db.set(`bluebot_welcomeImage_${message.guild.id}`, "true");
      }
      if (args[1] === "unset") {
        let image = db.get(`bluebot_welcomeImage_${message.guild.id}`);
        if (!image) {
          let embed = new discord.MessageEmbed()
            .setColor(config.error)
            .setDescription(
              `❌ First use the command \`${prefix}welcome image set\``
            );
          return message.channel.send(embed);
        }
        let embed = new discord.MessageEmbed()
          .setColor(config.success)
          .setDescription(`✅ Success unseted welcome image`);

        message.channel.send(embed);
        db.delete(`bluebot_welcomeImage_${message.guild.id}`);
      }
    }

    if (args[0] === "test") {
      let channel_id = db.get(`bluebot_welcomeChannel_${message.guild.id}`);
      let channel = message.guild.channels.cache.get(channel_id);
      if (!channel) {
        let embed = new discord.MessageEmbed()
          .setColor(config.error)
          .setDescription(
            `❌ First use the command \`${prefix}welcome channel set #channel\``
          );
        return message.channel.send(embed);
      }
      let member = message.member;
      let image = db.get(`bluebot_welcomeImage_${member.guild.id}`);

      if (!image) {
        let channel_id = db.get(`bluebot_welcomeChannel_${member.guild.id}`);
        let channel = member.guild.channels.cache.get(channel_id);
        if (channel === null || !channel) return;
        let tex = db.get(`bluebot_welcomeText_${member.guild.id}`);
        if (!tex)
          tex = `**Welcome To \`${member.guild.name}\`\nYou are \`${member.guild.memberCount}th\` member**`;
        let text = tex
          .replace("{server.name}", member.guild.name)
          .replace("{server.member.count}", member.guild.memberCount)
          .replace("{server.id}", member.guild.id)
          .replace(
            "{server.human.count}",
            member.guild.members.cache.filter(m => !m.user.bot).size
          )
          .replace(
            "{server.bot.count}",
            member.guild.members.cache.filter(m => m.user.bot).size
          )
          .replace("{member.name}", member.user.username)
          .replace("{member.mention}", member)
          .replace("{member.tag}", member.user.tag)
          .replace("{member.id}", member.user.id)
          .replace("{member.discriminstor}", member.user.discriminator);
        channel.send(text);
      }

      if (image) {
        let user_name =
          member.user.username.length > 9
            ? `${member.user.username.substring(0, 9)}...`
            : member.user.username;
        let guild_name =
          member.guild.name.length > 11
            ? `${member.guild.name.substring(0, 11)}...`
            : member.guild.name;
        let canvas = createCanvas(1024, 450);
        let ctx = canvas.getContext("2d");
        let background = await loadImage(
          "https://media.discordapp.net/attachments/740842537043886140/743030040991891476/welcome-image-blank.png?width=400&height=176"
        );
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

        ctx.font = "65px abraham demo";
        ctx.fillStyle = "#ffffff";
        ctx.fillText(
          `Hello ${user_name}#${member.user.discriminator}!`,
          350,
          115
        );
        ctx.fillText(`Welcome to ${guild_name}`, 350, 245);
        ctx.fillText(`You are ${member.guild.memberCount}'th member`, 350, 370);

        ctx.font = "30px abraham demo";
        ctx.fillStyle = "#ccccff";
        ctx.fillText(` `, 157, 420);

        ctx.arc(180, 227, 135, 0, Math.PI * 2, true);
        ctx.lineWidth = 7;
        ctx.strokeStyle = "#3498db";
        ctx.stroke();
        ctx.closePath();
        ctx.clip();

        let avatar = await loadImage(
          member.user.displayAvatarURL({ format: "png" })
        );
        ctx.drawImage(avatar, 45, 93, 270, 270);
        let img = new discord.MessageAttachment(
          canvas.toBuffer(),
          "welcome.png"
        );

        let channel_id = db.get(`bluebot_welcomeChannel_${member.guild.id}`);
        let channel = member.guild.channels.cache.get(channel_id);
        if (channel === null || !channel) return;
        let tex = db.get(`bluebot_welcomeText_${member.guild.id}`);
        if (!tex)
          tex = `**Welcome To \`${member.guild.name}\`\nYou are \`${member.guild.memberCount}th\` member**`;
        let text = tex
          .replace("{server.name}", member.guild.name)
          .replace("{server.member.count}", member.guild.memberCount)
          .replace("{server.id}", member.guild.id)
          .replace(
            "{server.human.count}",
            member.guild.members.cache.filter(m => !m.user.bot).size
          )
          .replace(
            "{server.bot.count}",
            member.guild.members.cache.filter(m => m.user.bot).size
          )
          .replace("{member.name}", member.user.username)
          .replace("{member.mention}", member)
          .replace("{member.tag}", member.user.tag)
          .replace("{member.id}", member.user.id)
          .replace("{member.discriminstor}", member.user.discriminator);
        channel.send(text, img);
      }
    }
  }
};
