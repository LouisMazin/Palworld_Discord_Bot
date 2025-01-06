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
		programMessage.content = "||<@"+interaction.options.getUser('user').id+">||";
		await interaction.reply(programMessage);
	},
};