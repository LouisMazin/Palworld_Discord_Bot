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

client.on('ready', () => {
  console.log('Bot started !');
});
const update = async () => {
    try {
        let state = ":orange_circle:";
        let players = "?";
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
            return response.data["currentplayernum"].toString();
          })
          .catch((error) => {
            players = "?";
          });

          const state_reponse = await fetch("https://panel.louismazin.ovh/api/client/servers/c1e3ad72/resources", { method : "GET", headers });
        const state_data = await state_reponse.json();
        if(state_data["attributes"]["current_state"] === "running"){
            state = ":green_circle:";
        }else{
            state = ":red_circle:";
        }
        const title = "Serveur : "+state+" Joueurs : "+players;
        const channel = client.channels.fetch("1256341578687975506");
        channel.setName(title);
    } catch (error) {
        console.log(error);
    }
}

client.login(token);

setInterval(update, 1000);