const { SlashCommandBuilder } = require('discord.js');
const rolesMessage = require("./rolesMessage.json")


module.exports = {
	data: new SlashCommandBuilder()
		.setName('roles')
		.setDescription('Affichez le message qui permet de choisir un rôle !'),
	async execute(interaction) {
        if (interaction.member.user.id==="391708236698615809") {
            await interaction.reply({ content: rolesMessage, ephemeral: true });
        }
	},
};