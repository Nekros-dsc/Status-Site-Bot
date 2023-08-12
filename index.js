tcpp = require('tcp-ping');
const {
    Client,
    Collection,
    GatewayIntentBits,
    Partials,
    DiscordAPIError,
    EmbedBuilder
  } = require("discord.js");
  const client = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent,
      GatewayIntentBits.GuildMembers,
      GatewayIntentBits.GuildPresences,
      GatewayIntentBits.GuildVoiceStates,
      GatewayIntentBits.DirectMessages,
      GatewayIntentBits.GuildMessageReactions,
      GatewayIntentBits.GuildBans,
      GatewayIntentBits.GuildEmojisAndStickers,
      GatewayIntentBits.GuildInvites,
    ],
    partials: [
      Partials.Channel,
      Partials.Message,
      Partials.User,
      Partials.GuildMember,
      Partials.Reaction,
      Partials.ThreadMember,
      Partials.GuildScheduledEvent,
    ],
  });

const config = require("./config.json");
client.config = config;

client.login(config.bottoken);



client.on('ready', () => {
    console.log('ready')
    let addr = config.ipweb0,
    port = config.portweb0;
    nameweb0 = config.nameweb0;
    
    var currentDate = new Date();
    let ping = new EmbedBuilder()
    .setTitle(`Verification`)
    .setColor('Blue')
    .addFields({ name: `Récupération des différents Variable `, value: 'chargement...'})
    .setFooter({ text: `Dernière actualisation le ${new Date().toLocaleString('fr-FR',{timeZone: "Europe/Paris"})}` })
    client.channels.resolve(config.setchannel).send({ embeds: [ping] })
    .then(msg => {
        setInterval(() => {
            tcpp.probe(addr, port, function(err, available0) {
                    tcpp.ping({ address: addr, port: port }, function(err, data) {
                        var online = '🟢'
                        var offline = '🔴'
                        if (available0 == true) {var web = `${online} | [${nameweb0}](https://${addr}) (${Math.floor(data.avg)}ms)`} else {var web = `${offline} | [${nameweb0}](https://${addr}) `} 
                        
                        let ping = new EmbedBuilder()
                        .setTitle("Statut Infrastructure :")
                        .setColor('Blue')
                        .addFields({ name: '_ _', value: '_ _', inline: true }) 
                        .addFields({ name: `☁️** — Nom du web:** `, value: `${web}` })
                        .addFields({ name: '_ _', value: '_ _', inline: true })
                        .addFields({ name: `» Légende :`, value: `${online} = Service opérationnel \n${offline} = Service hors-ligne \n` })
                        .setFooter({ text: `Dernière actualisation : ${new Date().toLocaleString('fr-FR',{timeZone: "Europe/Paris"})}`})
                        msg.edit({ embeds: [ping] })
                });
        })
        }, 300) 
    })
})