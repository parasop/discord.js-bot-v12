const { Client, Collection } = require("discord.js");
const { config } = require("dotenv");
const { prefix } = require("./config.json");
require("./server.js")
const Discord  = require("discord.js")
const client = new Client({
disableEveryone: true
});
//--------WELCOME---------
const canvas = require("discord-canvas");
const welcomeCanvas = new canvas.Welcome();
const a = "000000";
//-----database-------
const { Database } = require("quickmongo");
client.db = new Database("mongodb://localhost/quickmongo");

client.commands = new Collection();
client.aliases = new Collection();
client.queue = new Map();

["command"].forEach(handler => {
  require(`./handlers/${handler}`)(client);
});

//If you don't know how to make it than you can  search on YT
client.db.on("ready", () => {
  //when database is ready!
  console.log("CONNECTED WITH DATABASE!");
});
//THX FOR WATCHING

// Collections

// Run the command loader

client.on("ready", () => {
  console.log(`Hi, ${client.user.username} is now online!`);

  client.user.setPresence("I am Devil");
});

client.on("message", async message => {
  if (message.author.bot) return;
  if (!message.guild) return;
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
  
//WELCOME  CHANNEL
  let wchannel = client.db.get(`welcome_${member.guild.id}`)
  
  
  //when ever new user join it will send
  let image = await welcomeCanvas
    .setUsername(member.user.username)
    .setDiscriminator(member.user.discriminator)
    .setMemberCount(member.guild.memberCount)
    .setGuildName(`${member.guild.name}`)
    .setAvatar(member.user.displayAvatarURL({ format: "png" }))

    .setColor("border", a)
    .setColor("username-box", a)
    .setColor("disriminator-box", a)
    .setColor("message-box", a)
    .setColor("title", a)
    .setColor("Avatar", a)

    .setBackground(
      "https://cdn.discordapp.com/attachments/769885454265876501/779265258928865290/images_83-1.jpeg"
    )
    .toAttachment();

  let attachment = new Discord.MessageAttachment(
    image.toBuffer(),
    "welcome.png"
  ); //attachment  its requir buffer

  client.channels.cache.get(wchannel).send(attachment);
}); //WELCOME  CHANNAEL SETUP COMPLETED NOW TEST IT


client.login(process.env.TOKEN);
