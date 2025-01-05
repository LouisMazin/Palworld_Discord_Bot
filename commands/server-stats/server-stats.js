const axios = require('axios');
const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require('discord.js');

const getPlayersNumberAndFPS = (platform) => {
    return new Promise((resolve, reject) => {
        let infos = "";
        const port = platform === 'Steam' ? '1025' : platform === 'Xbox' ? '1032' : '';
        
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
            reject("Erreur lors de la récupération des données : " + error);
        });
    });
}
const getPlayers = (platform) => {
    return new Promise((resolve, reject) => {
        let infos = "";
        const port = platform === 'Steam' ? '1025' : platform === 'Xbox' ? '1032' : '';
        
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
            reject("Erreur lors de la récupération des données : " + error);
        });
    });
}
const getParams = (platform) => {
    return new Promise((resolve, reject) => {
        let infos = "## Paramètres du Serveur : \n";
        const port = platform === 'Steam' ? '1025' : platform === 'Xbox' ? '1032' : '';
        
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
            const params = Object.entries(response.data);
            for(const [key, value] of params) {
                if(['Difficulty', 'DeathPenalty','bEnableInvaderEnemy','BaseCampMaxNum','BaseCampWorkerMaxNum','PalEggDefaultHatchingTime'].indexOf(key) !== -1) {
                    infos += "### - "+key+" : "+value+'\n';
                }
            }
            resolve(infos);
        })
        .catch((error) => {
            reject("Erreur lors de la récupération des données : " + error);
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
				)),
	async execute(interaction) {
        try {
            const platform = interaction.options.getString('plateforme');
            const infos = await getPlayersNumberAndFPS(platform);
            const params = await getParams(platform);
            const players = await getPlayers(platform);
            const message = new EmbedBuilder()
                .setColor('#0099ff')
                .setAuthor({ name: 'Couteau Suisse', iconURL: 'https://srv.latostadora.com/designall.dll/couteau-suisse---dessin-drole-sketchy--i:141385141697014138520;d:1416970;w:520;b:FFFFFF;m:1.jpg', url: 'louismazin.ovh'})
                .setTitle('Informations sur le Serveur Palworld '+platform)
                .setDescription(infos+(players==="" ? "" : players+"\n")+'\n'+params);
            await interaction.reply(message);
        } catch (error) {
            await interaction.reply({ content: "Une erreur est survenue : " + error, ephemeral: true });
        }
	},
};