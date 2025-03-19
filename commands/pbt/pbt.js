const { SlashCommandBuilder } = require('discord.js');
const programMessage = require("./programMessage.json")


module.exports = {
	data: new SlashCommandBuilder()
		.setName('pbt')
		.setDescription('Afichez les informations sur le programme de Louis !')
		.addUserOption(option =>
			option.setName('user')
				.setDescription('Utilisateur à mentionner')
				.setRequired(false)),
	async execute(interaction) {
		const user = interaction.options.getUser('user');
		const content = user ? `||<@${user.id}>||` : "";
		
		// Clone programMessage to avoid modifying the original
		const response = JSON.parse(JSON.stringify(programMessage));
		response.content = content;
		
		// Make the message ephemeral to make it visible only to sender and mentioned user
		await interaction.reply({
			...response,
			ephemeral: true
		});
	},
};