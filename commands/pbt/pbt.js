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
		const message = user ? `||<@${user.id}>|| ${programMessage}` : programMessage;
		await interaction.reply(message);
	},
};