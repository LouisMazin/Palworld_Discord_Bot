const { SlashCommandBuilder } = require('discord.js');
const welcomeMessage = require("./welcomeMessage.json")


module.exports = {
	data: new SlashCommandBuilder()
		.setName('bienvenue')
		.setDescription('Souhaitez la bienvenue !'),
	async execute(interaction) {
		await interaction.reply(welcomeMessage);
	},
};