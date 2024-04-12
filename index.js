tcpp = require('tcp-ping');
const { Client, GatewayIntentBits, Partials, EmbedBuilder } = require('discord.js');
  const client = new Client({ 
    intents: [ GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildPresences, GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.DirectMessages, GatewayIntentBits.GuildMessageReactions, GatewayIntentBits.GuildBans, GatewayIntentBits.GuildEmojisAndStickers, GatewayIntentBits.GuildInvites ], 
    partials: [ Partials.Channel, Partials.Message, Partials.User, Partials.GuildMember, Partials.Reaction, Partials.ThreadMember, Partials.GuildScheduledEvent ]
   });
client.config = require('./config.json');
client.login(client.config.token);

let description = '';

var online = '🟢'
var offline = '🔴'

client.on('ready', () => {
    console.log(`[!] — Logged in as ${client.user.tag} (${client.user.id})`);

    const embed = new EmbedBuilder()
    .setTitle('`🪄` ▸ Verification')
    .setDescription('*Loading...*')
    .setFooter({ text: `Last updated on ${new Date().toLocaleString('fr-FR',{timeZone: 'Europe/Paris'})}`, iconURL: client.user.avatarURL() })
    .setColor('#2b2d31');
    client.channels.resolve(client.config.channel).send({ embeds: [embed] })
    .then(msg => {
    setInterval(() => {
    client.config.site.forEach((s) => {
        tcpp.probe(s.ipweb, s.portweb, function(err, available0) {
                    tcpp.ping({ address: s.ipweb, port: s.portweb }, function(err, data) {
                        if (available0 == true) {var web = `*\`${online}\` — [\`${s.nameweb}\`](https://${s.ipweb}) (\`${Math.floor(data.avg)}ms\`)*`} else {var web = `*\`${offline}\` — [\`${s.nameweb}\`](https://${s.ipweb})*`} 
                        description+= `${web}\n\n`
                });
        })
    })
    wait(2000, function() {
                    const embed = new EmbedBuilder()
                        .setTitle('`🪄` ▸ Status Site')
                        .setDescription(description)
                        .setFooter({ text: `Last updated on ${new Date().toLocaleString('fr-FR',{timeZone: 'Europe/Paris'})}`, iconURL: client.user.avatarURL() })
                        .setColor('#2b2d31');
                    msg.edit({ embeds: [embed] }), description = ''
  })
}, 3000)
})
})

function wait(milliseconds, callback) {
  setTimeout(callback, milliseconds);
}
