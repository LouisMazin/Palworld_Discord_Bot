const axios = require('axios');
const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require('discord.js');

const getPlayersNumberAndFPS = () => {
    return new Promise((resolve, reject) => {
        let infos = "";

        axios({
            method: 'get',
            maxBodyLength: Infinity,
            url: 'http://play.louismazin.ovh:8212/v1/api/metrics',
            headers: { 
                'Accept': 'application/json', 
                'Authorization': 'Basic YWRtaW46Q2FjYXBpcGlkdTc5'
            }
        })
        .then((response) => {
            infos += "## FPS du Serveur : "+response.data["serverfps"]+'\n';
            infos += "## Nombre de joueurs connectés : "+response.data["currentplayernum"]+'\n';
            resolve(infos);
        })
        .catch((error) => {
            console.log("Erreur lors de l'appel à l'api pterodactyl (serveur injoignable)");
            reject("Le serveur est hors ligne.");
        });
    });
}
const getPlayers = () => {
    return new Promise((resolve, reject) => {
        let infos = "";

        axios({
            method: 'get',
            maxBodyLength: Infinity,
            url: 'http://play.louismazin.ovh:8212/v1/api/players',
            headers: { 
                'Accept': 'application/json', 
                'Authorization': 'Basic YWRtaW46Q2FjYXBpcGlkdTc5'
            }
        })
        .then((response) => {
            const players = Object.entries(response.data.players);
            if (players.length === 0) {
                resolve(infos);
                return;
            }
            for(const player of players) {
                const joueur = player[1];
                infos += "### - "+joueur.name+' - niveau '+joueur.level+' - ping : '+Math.round(joueur.ping)+'ms\n';
            }
            resolve(infos);
        })
        .catch((error) => {
            console.log("Erreur lors de l'appel à l'api pterodactyl (serveur injoignable)");
            reject("Le serveur est hors ligne.");
        });
    });
}
const getParams = (platform) => {
    return new Promise((resolve, reject) => {
        let infos = "## Paramètres du Serveur : \n";

        axios({
            method: 'get',
            maxBodyLength: Infinity,
            url: 'http://play.louismazin.ovh:8212/v1/api/settings',
            headers: { 
                'Accept': 'application/json', 
                'Authorization': 'Basic YWRtaW46Q2FjYXBpcGlkdTc5'
            }
        })
        .then((response) => {
            const paramNames = {'Difficulty': 'Difficulté', 'DeathPenalty': 'Pénalité de mort', 'bEnableInvaderEnemy': 'Ennemis envahisseurs', 'BaseCampMaxNumInGuild': 'Nombre max de camps par guilde', 'BaseCampWorkerMaxNum': 'Nombre max de pals par camp'}
            const params = Object.entries(response.data);
            for(const [key, value] of params) {
                if(Object.keys(paramNames).indexOf(key) !== -1) {
                    infos += "### - "+paramNames[key]+' : '+value+'\n';
                }
            }
            resolve(infos);
        })
        .catch((error) => {
            console.log("Erreur lors de l'appel à l'api pterodactyl (serveur injoignable)");
            reject("Le serveur est hors ligne.");
        });
    });
}
module.exports = {
	data: new SlashCommandBuilder()
		.setName('server-stats')
		.setDescription('Afichez les informations sur le Serveur Palworld !')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('Utilisateur à mentionner')
                .setRequired(false)),
	async execute(interaction) {
        try {
            const infos = await getPlayersNumberAndFPS();
            const params = await getParams();
            const players = await getPlayers();
            const user = interaction.options.getUser('user')
            const message = new EmbedBuilder()
                .setColor('#0099ff')
                .setDescription('# Informations sur le Serveur Palworld\n\n## :video_game: Nom du serveur :\n### Rygainland\n\n## :wireless: IP :\n### play.louismazin.ovh:1028\n\n## :no_entry: Mot de passe :\n### serverpassword\n\n## :repeat: État :\n### https://discord.com/channels/1068240252092813373/1263481798667796623\n'+infos+(players==="" ? "" : players+"\n")+'\n'+params);
            await interaction.reply({ content: (user ? "||<@"+interaction.options.getUser('user').id+">||\n" : null), embeds: [message] });
        } catch (error) {
            await interaction.reply({ content: "Une erreur est survenue : " + error, ephemeral: true });
        }
	},
};