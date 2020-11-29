const Discord = require("discord.js");
const client = new Discord.Client();
const canvas = require("discord-canvas");
const welcomeCanvas = new canvas.Welcome();
const a = "000000";
//definite color
//dm chat bot
const Got = require("got");
client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setActivity("PARAS GAMING");
});

//chat bot
client.on("message", async message => {
  if (message.author.bot) return;
  //definite it so bot can't reply to another bot
  if (message.channel.type === "dm") {
    try {
      const res = await Got(
        `https://api.snowflakedev.xyz/chatbot?message=${Discord.Util.escapeMarkdown(
          message.content
        )}`
      );
      const json = await JSON.parae(res.body);

      return;
      message.channel.send(json.message);
    } catch (error) {
      //chat error
      return;
      message.channel
        .send("API ERROR TRY AGAIN!👍🏻")
        .then(() => console.log(error));
    }
  }
});

client.on("message", msg => {
  if (msg.content === "!ping") {
    msg.reply("Pong!");
  }
});

client.on("message", async message => {
  if (message.content === "!welcome") {
    client.emit("guildMemberAdd", message.member);
  }
});
client.on("guildMemberAdd", async member => {
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

  client.channels.cache.get("769885454265876501").send(attachment);
}); //test it

client.login(process.env.TOKEN);
