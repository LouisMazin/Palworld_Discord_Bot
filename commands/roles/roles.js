const { SlashCommandBuilder } = require('discord.js');
const rolesMessage = require("./rolesMessage.json")


module.exports = {
	data: new SlashCommandBuilder()
		.setName('roles')
		.setDescription('Affichez le message qui permet de choisir un rôle !'),
	async execute(interaction) {
        if(await interaction.member.roles.cache.some(role => role.name === 'Admin' || role.name === 'Modo')){
            await interaction.reply({ content: rolesMessage, ephemeral: true });
        }
	},
};