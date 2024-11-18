const axios = require('axios');


const update = async (headers,bot_guilds,numbers,client) => {
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
};
module.exports = update;