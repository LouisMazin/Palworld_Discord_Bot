const axios = require('axios');
const url = "https://panel.louismazin.ovh/api/client/servers/c1e3ad72/";
const headers = {
    "Accept": "application/json",
    "Content-Type": "application/json",
    "Authorization": "Bearer "+process.argv[3].toString()
};
const body_message = { "command": 'Broadcast Vidage_de_la_RAM_en_cours._Redémarrage_du_serveur.'};
const body_restart = { "signal": "restart" };
const checkAndRestartServer = async () => {
    try {
        const response = await fetch(url+"resources", { method : "GET", headers });
        const data = await response.json();
        if (data.attributes.resources.memory_bytes > 6442450944) { // 6 Go en octets
            axios({
                url: url + 'command',
                method: 'POST',
                headers: headers,
                data: body_message,
            })
            axios({
                url: url + 'power',
                method: 'POST',
                headers: headers,
                data: body_restart,
            })
            console.log("Observer : La RAM utilisée est supérieure à 6 Go. Redémarrage du serveur nécessaire.");

        }
    } catch (error) {
        console.error("Observer : ", error);
    }
};

// Vérifier toutes les 3 minutes (180000 millisecondes)
setInterval(checkAndRestartServer, 180000);
console.log("Observer started !")