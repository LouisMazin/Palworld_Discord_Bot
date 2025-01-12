const axios = require('axios');


const update = async (headers,bot_guilds,numbers,client,ip,idServer,platform) => {
    try {
        let state = "🔴";
        let players = "0";
        let config = {
            method: 'get',
          maxBodyLength: Infinity,
            url: 'http://'+ip+'/v1/api/metrics',
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

        const state_reponse = await fetch("https://panel.louismazin.ovh:"+platform === "𝐒𝐭𝐞𝐚𝐦" ? "8212" : "8213" +"/api/client/servers/"+idServer+"/resources", { method : "GET", headers });
        const state_data = await state_reponse.json();
        if(state_data["attributes"]["current_state"] === "running"){
            state = "🟢";
        }else{
            state = "🔴";
        }
        const title = platform+" : "+state+" 𝐉𝐨𝐮𝐞𝐮𝐫𝐬 : "+numbers[parseInt(players)];
        bot_guilds.forEach(element => {
          client.channels.fetch(platform === "𝐒𝐭𝐞𝐚𝐦" ? element.steam : element.xbox)
            .then(channel => {
              if(channel.name != title){
                channel.setName(title);
                console.log("Bot :"+element.name+": Updating "+platform+" channel name to : "+title);
              }
            })
            .catch(error => {console.log("Bot : error on server "+element.name+" error :"+error);});
        });
        
    } catch (error) {
        console.log("Bot : "+error);
    }
};
module.exports = update;