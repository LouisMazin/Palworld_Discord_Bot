const { SlashCommandBuilder } = require('discord.js');
const welcomeMessage = require("./welcomMessage.json")


module.exports = {
	data: new SlashCommandBuilder()
		.setName('bienvenue')
		.setDescription('Souhaitez la bienvenue!'),
	async execute(interaction) {
		await interaction.reply(welcomeMessage);
	},
};