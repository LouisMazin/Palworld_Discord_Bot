const { SlashCommandBuilder } = require('discord.js');
const programMessage = require("./programMessage.json")


module.exports = {
	data: new SlashCommandBuilder()
		.setName('pbt')
		.setDescription('Afichez les informations sur le programme de Louis !'),
	async execute(interaction) {
		await interaction.reply(programMessage);
	},
};