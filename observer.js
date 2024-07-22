const axios = require('axios');
let restart = {method: 'post',maxBodyLength: Infinity,url: 'http://play.louismazin.ovh:1025/v1/api/shutdown',headers: { 'Accept': 'application/json', 'Authorization': 'Basic YWRtaW46Y2FjYXBpcGlkdTc5'},data : JSON.stringify({"waittime": 10,"message": "La mémoire est pleine, le serveur redémarre dans 10 secondes. (ça prend 20 secondes)" })};
let save = {method: 'post',maxBodyLength: Infinity,url: 'http://play.louismazin.ovh:1025/v1/api/save',headers: {'Accept': 'application/json', 'Authorization': 'Basic YWRtaW46Y2FjYXBpcGlkdTc5'}};
let check_ram = {method: 'get',maxBodyLength: Infinity,url: 'https://panel.louismazin.ovh/api/client/servers/c1e3ad72/resources',headers: {"Accept": "application/json","Content-Type": "application/json","Authorization": "Bearer "+process.argv[3].toString()}};
const checkAndRestartServer = async () => {
    try {
        axios(check_ram)
        .then((response) => {
            data = response.data;
            if (data.attributes.resources.memory_bytes > 6442450944) { // 6 Go en octets
                axios(save)
                .then((response) => {
                    axios(restart)
                        .then((response) => {
                        })
                        .catch((error) => {
                        console.log(error);
                        });
                    })
                .catch((error) => {
                    console.log(error);
                });
                console.log("Observer : RAM supérieure à 6,5 Go, serveur redémarré.");
            }
        })
    } catch (error) {
        console.error("Observer : ", error);
    }
};

// Vérifier toutes les 3 minutes (180000 millisecondes)
setInterval(checkAndRestartServer, 180000);
console.log("Observer started !")