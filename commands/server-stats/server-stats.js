// Affiche les stats su serveur Palworld (joueurs en ligne, paramètres..)
const axios = require('axios');
const { SlashCommandBuilder } = require('discord.js');
// const statsMessage = require("./statsMessage.json");
getStats = (platform) => {
    return new Promise((resolve, reject) => {
        const port = platform === 'steam' ? '1025' : platform === 'xbox' ?'1032' : '';
        if(port === '') {
            reject('Invalid platform');
        }
        axios('http://play.louismazin.ovh:'+port+'/v1/api/metrics')
        .then((response) => {
        console.log(response);
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