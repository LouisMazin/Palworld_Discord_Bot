const { SlashCommandBuilder } = require('discord.js');
const welcomeMessage = require("./welcomeMessage.json")


module.exports = {
	data: new SlashCommandBuilder()
		.setName('bienvenue')
		.setDescription('Souhaitez la bienvenue !'),
	async execute(interaction) {
		const message = JSON.parse(welcomeMessage);
		message.content = interaction.options.getUser('user');
		await interaction.reply(JSON.stringify(welcomeMessage));
	},
};