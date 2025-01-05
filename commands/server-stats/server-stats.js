const axios = require('axios');
const { SlashCommandBuilder } = require('discord.js');

const getPlayersAndFPS = (platform) => {
    return new Promise((resolve, reject) => {
        let infos = "";
        const port = platform === 'steam' ? '1025' : platform === 'xbox' ? '1032' : '';
        
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
            infos += "## Nombre de joueurs connectés : "+response.data["currentplayernum"]+'\n';
            infos += "## FPS du Serveur : "+response.data["serverfps"]+'\n';
            resolve(infos);
        })
        .catch((error) => {
            reject("Erreur lors de la récupération des données : " + error);
        });
    });
}
const getParams = (platform) => {
    return new Promise((resolve, reject) => {
        let infos = "";
        const port = platform === 'steam' ? '1025' : platform === 'xbox' ? '1032' : '';
        
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
            // response.data is a dict, so I want a list of key-value pairs
            const params = Object.entries(response.data);
            for(const [key, value] of params) {
                infos += "## "+key+" : "+value+'\n';
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
					{ name: 'Steam', value: 'steam' },
					{ name: 'Xbox', value: 'xbox' },
				)),
	async execute(interaction) {
        try {
            const platform = interaction.options.getString('plateforme');
            const infos = await getPlayersAndFPS(platform);
            const params = await getParams(platform);
            await interaction.reply(infos+'\n'+params);
        } catch (error) {
            await interaction.reply({ content: "Une erreur est survenue : " + error, ephemeral: true });
        }
	},
};