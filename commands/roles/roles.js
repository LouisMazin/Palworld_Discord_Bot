const { SlashCommandBuilder } = require('discord.js');
const rolesMessage = require("./rolesMessage.json")


module.exports = {
	data: new SlashCommandBuilder()
		.setName('roles')
		.setDescription('Affichez le message qui permet de choisir un rôle !'),
	async execute(interaction) {
        await interaction.reply(rolesMessage);
	},
};