const { SlashCommandBuilder } = require('discord.js');
const welcomeMessage = require("./welcomeMessage.json")

module.exports = {
	data: new SlashCommandBuilder()
		.setName('bienvenue')
		.setDescription('Souhaitez la bienvenue !')
		.addUserOption(option =>
			option.setName('user')
				.setDescription('Utilisateur à mentionner')
				.setRequired(false)),
	async execute(interaction) {
		const user = interaction.options.getUser('user');
		const message = user ? `||<@${user.id}>|| ${welcomeMessage}` : welcomeMessage;
		await interaction.reply(message);
	},
};