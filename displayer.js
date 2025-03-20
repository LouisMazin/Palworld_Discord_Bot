const axios = require('axios');


const update = async (headers,numbers,client) => {
    try {
        let state = "🔴";
        let players = "0";
        let config = {
          method: 'get',
          maxBodyLength: Infinity,
          url: 'http://play.louismazin.ovh:8212/v1/api/metrics',
          headers: { 
            'Accept': 'application/json', 
            'Authorization': 'Basic YWRtaW46Q2FjYXBpcGlkdTc5',
          }
        };
          
          axios(config)
          .then((response) => {
            players = response.data["currentplayernum"];
          })
          .catch((error) => {
            console.log("Erreur lors de l'appel à l'api pterodactyl (serveur injoignable)");
            players = "0";
          });

        const state_reponse = await fetch("https://panel.louismazin.ovh/api/client/servers/ae4a628f/resources", { method : "GET", headers });
        const state_data = await state_reponse.json();
        if(state_data["attributes"]["current_state"] === "running"){
            state = "🟢";
        }else{
            state = "🔴";
        }
        const title = "𝐒𝐞𝐫𝐯𝐞𝐫 : "+state+" 𝐉𝐨𝐮𝐞𝐮𝐫𝐬 : "+numbers[parseInt(players)];
        client.channels.fetch(1263481798667796623n)
          .then(channel => {
            if(state !== channel.name.split(" ")[2] || numbers[parseInt(players)] !== channel.name.split(" ")[5]){
              channel.setName(title);
              console.log("Channel's name changed for : "+title);
            }
          })
          .catch(error => {console.log("Bot : error :"+error);});
        
    } catch (error) {
        console.log("Bot : "+error);
    }
};
module.exports = update;