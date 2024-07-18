const axios = require('axios');
const Discord = require('discord.js');
const client = new Discord.Client({ intents: [Discord.GatewayIntentBits.GuildMessages] });
const args = process.argv;
const token = args[2].toString();
const headers = {
    "Accept": "application/json",
    "Content-Type": "application/json",
    "Authorization": "Bearer "+args[3].toString()
};
const bot_guilds = [{"name" : "Crashtest", "infos_channel_id":"1256341578687975506"},{"name" : "Rygain", "infos_channel_id":"1262892142037041203"}];

client.on('ready', () => {
  console.log('Observer started !');
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
            players = response.data["currentplayernum"].toString();
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
        const title = "Serveur : "+state+" Joueurs : "+players;
        bot_guilds.forEach(element => {
          client.channels.fetch(element.infos_channel_id)
            .then(channel => {
              if(channel.name != title){
                channel.setName(title);
                console.log(element.name+": Updating channel name to : "+title);
              }
            })
            .catch(console.log("error on server "+element.name));
        });
        
    } catch (error) {
        console.log(error);
    }
}

client.login(token);

setInterval(update, 1000);