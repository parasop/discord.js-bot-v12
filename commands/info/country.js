const request = require("node-superfetch");
const discord = require("discord.js");
module.exports = {
  name: "country",

  run: async (client, message, args) => {
    const query = args[0];
    const { body } = await request.get(
      `https://restcountries.eu/rest/v2/name/${query}`
    );
    const data = body[0];
    const embed = new discord.MessageEmbed()
      .setTitle(data.name)
      .setThumbnail(
        `https://www.countryflags.io/${data.alpha2Code}/flat/64.png`
      )
      .addFields(
        {
          name: "👩‍🚀 Population",
          value: `\`${data.population}\``,
          inline: true
        },
        {
          name: "📍 Capital",
          value: `\`${data.capital || "No capital available!"}\``,
          inline: true
        },
        {
          name: "💰 Currency",
          value: `\`${data.currencies[0].symbol}\``,
          inline: true
        },
        {
          name: "🗺️ Location",
          value: `\`${data.subregion || data.region}\``,
          inline: true
        },
        {
          name: "🏷️ Origin Title",
          value: `\`${data.nativeName || "No origin title available!"}\``,
          inline: true
        },
        { name: "📏 Size", value: `\`${data.area}\`km`, inline: true },
        {
          name: "✏️ Languages",
          value: data.languages
            .map(language => `\`${language.name}\``)
            .join("\n"),
          inline: true
        }
      );
    return message.channel.send(embed);
  }
};
