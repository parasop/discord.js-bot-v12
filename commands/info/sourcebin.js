const sourcebin = require('sourcebin_js')

module.exports = {
   name: 'sourcebin',
   run: async (client, message, args) => {

       if (!args.join(' ')) return message.reply('Please give a random code bruh')

      sourcebin.create([{
      name: `Code by ${message.author.tag}`,
      content: args.join(' '),
      languageId: 'js'
    }])
      .then(src => {
           message.channel.send(src.url)
    })
  .catch(e => {
         message.channel.send(`Error, try again later`)
   });

  }
}
