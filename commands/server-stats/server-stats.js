// Affiche les stats su serveur Palworld (joueurs en ligne, paramètres..)
const axios = require('axios');
const { SlashCommandBuilder } = require('discord.js');
// const statsMessage = require("./statsMessage.json");
getStats = (platform) => {
    var infos = "";
    return new Promise((resolve, reject) => {
        const port = platform === 'steam' ? '1025' : platform === 'xbox' ?'1032' : '';
        if(port === '') {
            reject('Invalid platform');
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
            console.log(infos);
            resolve(infos);
        })
        .catch((error) => {
        console.log(error);
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
		const platform = interaction.options.getString('plateforme');
		
		getStats(platform);
		
		// await interaction.reply(message);
	},
};