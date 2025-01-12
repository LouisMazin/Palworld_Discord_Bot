const axios = require('axios');
const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require('discord.js');

const getPlayersNumberAndFPS = (platform) => {
    return new Promise((resolve, reject) => {
        let infos = "";
        const port = platform === 'Steam' ? '8212' : platform === 'Xbox' ? '8213' : '';
        
        if(port === '') {
            reject('Invalid platform');
            return;
        }

        axios({
            method: 'get',
            maxBodyLength: Infinity,
            url: 'http://play.louismazin.ovh:'+port+'/v1/api/metrics',
            headers: { 
                'Accept': 'application/json', 
                'Authorization': 'Basic YWRtaW46Y2FjYXBpcGlkdTc5'
            }
        })
        .then((response) => {
            infos += "## FPS du Serveur : "+response.data["serverfps"]+'\n';
            infos += "## Nombre de joueurs connectés : "+response.data["currentplayernum"]+'\n';
            resolve(infos);
        })
        .catch((error) => {
            console.log("Erreur lors de la récupération des données : " + error);
            reject("Le serveur est hors ligne.");
        });
    });
}
const getPlayers = (platform) => {
    return new Promise((resolve, reject) => {
        let infos = "";
        const port = platform === 'Steam' ? '8212' : platform === 'Xbox' ? '8213' : '';
        
        if(port === '') {
            reject('Invalid platform');
            return;
        }

        axios({
            method: 'get',
            maxBodyLength: Infinity,
            url: 'http://play.louismazin.ovh:'+port+'/v1/api/players',
            headers: { 
                'Accept': 'application/json', 
                'Authorization': 'Basic YWRtaW46Y2FjYXBpcGlkdTc5'
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
            console.log("Erreur lors de la récupération des données : " + error);
            reject("Le serveur est hors ligne.");
        });
    });
}
const getParams = (platform) => {
    return new Promise((resolve, reject) => {
        let infos = "## Paramètres du Serveur : \n";
        const port = platform === 'Steam' ? '8212' : platform === 'Xbox' ? '8213' : '';
        
        if(port === '') {
            reject('Invalid platform');
            return;
        }

        axios({
            method: 'get',
            maxBodyLength: Infinity,
            url: 'http://play.louismazin.ovh:'+port+'/v1/api/settings',
            headers: { 
                'Accept': 'application/json', 
                'Authorization': 'Basic YWRtaW46Y2FjYXBpcGlkdTc5'
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
            console.log("Erreur lors de la récupération des données : " + error);
            reject("Le serveur est hors ligne.");
        });
    });
}
module.exports = {
	data: new SlashCommandBuilder()
		.setName('server-stats')
		.setDescription('Afichez les informations sur le Serveur Palworld !')
		.addStringOption(option =>
			option.setName('plateforme')
				.setDescription('Choisissez votre plateforme')
				.setRequired(true)
				.addChoices(
					{ name: 'Steam', value: 'Steam' },
                    { name: 'Xbox', value: 'Xbox' }
				))
        .addUserOption(option =>
            option.setName('user')
                .setDescription('Utilisateur à mentionner')
                .setRequired(false)),
	async execute(interaction) {
        try {
            const platform = interaction.options.getString('plateforme');
            const infos = await getPlayersNumberAndFPS(platform);
            const params = await getParams(platform);
            const players = await getPlayers(platform);
            const user = interaction.options.getUser('user')
            const message = new EmbedBuilder()
                .setColor('#0099ff')
                .setDescription('# Informations sur le Serveur Palworld '+platform+"\n"+infos+(players==="" ? "" : players+"\n")+'\n'+params);
            await interaction.reply({ content: (user ? "||<@"+interaction.options.getUser('user').id+">||\n" : null), embeds: [message] });
        } catch (error) {
            await interaction.reply({ content: "Une erreur est survenue : " + error, ephemeral: true });
        }
	},
};