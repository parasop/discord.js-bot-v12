const { Client, Collection } = require("discord.js");
const { config } = require("dotenv");
const { prefix,db,token } = require("./config.json");
require("./server.js");
const Discord = require("discord.js");
const client = new Client({
  disableEveryone: true
});

//--------WELCOME---------
const { createCanvas, loadImage, registerFont } = require("canvas");
//--------MUSIC - CLIENT------
const { Player } = require('discord-player');
const fs = require("fs")
client.player = new Player(client);

//-----database-------
const {Database} = require("quickmongo")
//Collection
client.db =  new Database(db)
client.commands = new Collection();
client.aliases = new Collection();
client.queue = new Map();
client.snipes = new Map();

["command"].forEach(handler => {
  require(`./handlers/${handler}`)(client);
});

const player = fs.readdirSync('./player').filter(file => file.endsWith('.js'));


for (const file of player) {
    //console.log(`Loading discord-player event ${file}`);
    const event = require(`./player/${file}`);
    client.player.on(file.split(".")[0], event.bind(null, client));
};
client.on("ready", () => {
  console.log(`Hi, ${client.user.username} is now online!`);

  client.user.setActivity("PARAS GAMING 🇮🇳");
});


client.on("messageDelete",async (message) => {




  client.snipes.set(message.channel.id,{
content : message.content,
author: message.author.tag,
image: message.attachments.first() ? message.attachments.first().proxyURL : null




  })
})



//ANTI-MENTION
client.on("message",async message => {
  
if(message.mentions.members.array().length >= 4){
  
 if(message){
   await  message.delete()
 } 
return message.reply(`You are not allow to mention mass members!`) 
  
}
 
  
  
})

//THANKS FOR WATCHING 
//FOR MORE HELP JOIN MY SERVER 






client.on("message", async message => {
  if (message.author.bot) return;
  if (!message.guild) return;
//AFK SYSTEM 
 //IF YOU  WANT MAKE GLOABAL AFK SYSTEM  JUST  REMOVE SERVER  id
 //THAKKS FOR WATCHING 
 //DON'T  FORGET  TO JOIN SUPPORT  SERVER 
  
  if (!message.content.startsWith(prefix)) return;

  // If message.member is uncached, cache it.
  if (!message.member)
    message.member = await message.guild.fetchMember(message);

  const args = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/g);
  const cmd = args.shift().toLowerCase();

  if (cmd.length === 0) return;

  // Get the command
  let command = client.commands.get(cmd);
  // If none is found, try to find it by alias
  if (!command) command = client.commands.get(client.aliases.get(cmd));

  // If a command is finally found, run the command
  if (command) command.run(client, message, args);
});

client.on("message", async message => {
  if (message.content === "!welcome") {
    client.emit("guildMemberAdd", message.member);
  }
});
client.on("guildMemberAdd", async member => {
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
    ctx.fillText(`Hello ${user_name}#${member.user.discriminator}!`, 350, 115);
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
    let img = new Discord.MessageAttachment(canvas.toBuffer(), "welcome.png");

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
});
client.login(token);
