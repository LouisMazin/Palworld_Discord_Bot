const axios = require('axios');


const update = async (headers,numbers,client) => {
    try {
        let state = "🔴";
        let players = "0";
        let config = {
          method: 'get',
          maxBodyLength: Infinity,
          url: 'http://play.louismazin.ovh:1028/v1/api/metrics',
          headers: { 
            'Accept': 'application/json', 
            'Authorization': 'Bearer YWRtaW46Y2FjYXBpcGlkdTc5'
          }
        };
          
          axios(config)
          .then((response) => {
            players = response.data["currentplayernum"];
          })
          .catch((error) => {
            console.log(error);
            players = "0";
          });

        const state_reponse = await fetch("https://panel.louismazin.ovh/api/client/servers/ae4a628f/resources", { method : "GET", headers });
        const state_data = await state_reponse.json();
        if(state_data["attributes"]["current_state"] === "running"){
            state = "🟢";
        }else{
            state = "🔴";
        }
        const playerNumber = parseInt(players);
        const title = "𝐒𝐞𝐫𝐯𝐞𝐫 :"+state+" 𝐉𝐨𝐮𝐞𝐮𝐫𝐬 : "+numbers[playerNumber];
        client.channels.fetch(1263481798667796623)
          .then(channel => {
            if(playerNumber!=0){
              channel.setName(title);
              console.log("Bot : Updating "+platform+" channel name to : "+title);
            }
          })
          .catch(error => {console.log("Bot : error :"+error);});
        
    } catch (error) {
        console.log("Bot : "+error);
    }
};
module.exports = update;