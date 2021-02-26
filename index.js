const { Discord } = require('discord.js');
const Client = new Client({ ws: { intents: ['GUILDS', 'GUILD_MESSAGES'] } });
const dotenv = require('dotenv');
dotenv.config();
const PREFIX = "js/"

Client.on("ready", () => {
    console.log(`${Client.user.tag} is ready!`)
    setInterval(() => {
  let users = 0
  Client.guilds.cache.forEach(g => users += g.memberCount)
  const activity = [
    {
      type: "PLAYING",
      status: "In DPYJS"
    },
    { 
      type: "LISTENING",
      status: "To 24/7 Radio"
    }
  ]
  let s = activity[Math.floor(Math.random() * activity.length)]
  Client.user.setActivity(s.status, {type: s.type})
  }, 1*60000)
}) 

Client.snipes = new Map()
Client.on("messageDelete", function(message, channel){
    Client.snipes.set(message.channel.id, { 
        channel:message.channel,
        content:message.content,
        author:message.author.tag,
        image:message.attachments.first() ? message.attachments.first().proxyURL : null

    })
})

client.on('message', message => {
    if(!message.content.startsWith(PREFIX)) return;
  if (message.author.bot) return;
  if (!message.guild) return; 
  let args = message.content.substring(PREFIX.length).split(" ");
  switch(args[0]){
    case "snipe":
        const msg = client.snipes.get(message.channel.id)
        if(!msg){
            const NoMsg = new Discord.MessageEmbed()        
            .setDescription("There was no message deleted in this channel!")
            return message.channel.send(NoMsg);
        }
        const snipe = new Discord.MessageEmbed()
        .setAuthor(msg.author)
        .setDescription(msg.content)
        if(msg.image)snipe.setImage(msg.image)
        message.channel.send(snipe);
     break;
    }
  }
});

client.login(`${process.env.TOKEN}`);
