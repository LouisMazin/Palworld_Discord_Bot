const axios = require('axios');
require('./observer.js');
const Discord = require('discord.js');

const client = new Discord.Client({ intents: [Discord.GatewayIntentBits.GuildMessages] });
const args = process.argv;
const token = args[2].toString();
const headers = {
    "Accept": "application/json",
    "Content-Type": "application/json",
    "Authorization": "Bearer "+args[3].toString()
};
const bot_guilds = [{"name" : "Crashtest", "infos_channel_id":"1256341578687975506"},{"name" : "Rygain", "infos_channel_id":"1263481798667796623"}];
const numbers=["𝟎","𝟏","𝟐","𝟑","𝟒","𝟓","𝟔","𝟕","𝟖","𝟗","𝟏𝟎","𝟏𝟏","𝟏𝟐","𝟏𝟑","𝟏𝟒","𝟏𝟓","𝟏𝟔","𝟏𝟕","𝟏𝟖","𝟏𝟗","𝟐𝟎","𝟐𝟏","𝟐𝟐","𝟐𝟑","𝟐𝟒","𝟐𝟓","𝟐𝟔","𝟐𝟕","𝟐𝟖","𝟐𝟗","𝟑𝟎","𝟑𝟏","𝟑𝟐"];

client.on('ready', () => {
  console.log('Bot started !');
  client.user.setPresence({ activities: [{ name: 'des vidéos de Rygain.', type: 'WATCHING' }], status: 'online' });
});
client.on('interactionCreate', message =>{
  console.log(message.content);
  if(message.content.startsWith("!bienvenue")){
    message.channel.bulkDelete(message);
    console.log(message.content);
  }
});
const update = async () => {
    try {
        let state = "🔴";
        let players = "0";
        let config = {
            method: 'get',
          maxBodyLength: Infinity,
            url: 'http://play.louismazin.ovh:1025/v1/api/metrics',
            headers: { 
              'Accept': 'application/json', 
              'Authorization': 'Basic YWRtaW46Y2FjYXBpcGlkdTc5'
            }
          };
          
          axios(config)
          .then((response) => {
            players = response.data["currentplayernum"];
          })
          .catch((error) => {
            players = "0";
          });

        const state_reponse = await fetch("https://panel.louismazin.ovh/api/client/servers/c1e3ad72/resources", { method : "GET", headers });
        const state_data = await state_reponse.json();
        if(state_data["attributes"]["current_state"] === "running"){
            state = "🟢";
        }else{
            state = "🔴";
        }
        const title = "𝐒𝐞𝐫𝐯𝐞𝐮𝐫 : "+state+" 𝐉𝐨𝐮𝐞𝐮𝐫𝐬 : "+numbers[parseInt(players)];
        bot_guilds.forEach(element => {
          client.channels.fetch(element.infos_channel_id)
            .then(channel => {
              if(channel.name != title){
                channel.setName(title);
                console.log("Bot :"+element.name+": Updating channel name to : "+title);
              }
            })
            .catch(error => {console.log("Bot : error on server "+element.name+" eroor :"+error);});
        });
        
    } catch (error) {
        console.log("Bot : "+error);
    }
}

client.login(token);

setInterval(update, 60000);