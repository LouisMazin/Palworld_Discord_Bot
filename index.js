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
  console.log('Observer started !');
});
const update = async () => {
    check_state();
    check_players();
}
const check_players = async () => {
    try {
        let config = {
            method: 'get',
          maxBodyLength: Infinity,
            url: 'http://localhost:8212/v1/api/metrics',
            headers: { 
              'Accept': 'application/json'
            }
          };
          
          axios(config)
          .then((response) => {
            console.log(JSON.stringify(response.data));
          })
          .catch((error) => {
            console.log(error);
          });
    } catch (error) {
        console.error("Une erreur s'est produite lors de la vérification des joueurs :", error);
    }
}
const check_state = async () => {
    try {
        const state_reponse = await fetch("https://panel.louismazin.ovh/api/client/servers/c1e3ad72/resources", { method : "GET", headers });
        const state_data = await state_reponse.json();
        if(state_data["attributes"]["current_state"] === "running"){
            console.log("Server is running !");
        }else{
            console.log("Server is not running !");
        }
    } catch (error) {
        console.error("Une erreur s'est produite lors de la vérification de l'état :", error);
    }
};
client.login(token);

setInterval(update, 1000);