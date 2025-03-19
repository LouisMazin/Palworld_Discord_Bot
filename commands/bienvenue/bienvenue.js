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
		const content = user ? `||<@${user.id}>||` : "";
		
		// Clone welcomeMessage to avoid modifying the original
		const response = JSON.parse(JSON.stringify(welcomeMessage));
		response.content = content;
		
		// Make the message ephemeral if there's no mentioned user
		// If there is a mentioned user, only they and the sender will see it
		await interaction.reply({
			...response,
			ephemeral: true
		});
	},
};