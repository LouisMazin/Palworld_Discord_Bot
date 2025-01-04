const { SlashCommandBuilder } = require('discord.js');
const rolesMessage = require("./rolesMessage.json")


module.exports = {
	data: new SlashCommandBuilder()
		.setName('roles')
		.setDescription('Affichez le message qui permet de choisir un rôle !'),
	async execute(interaction) {
        console.log(interaction.member.roles.cache)
        if (interaction.member.roles.some(role => role.name === 'Modo' || role.name== 'Boss')) {
            await interaction.reply(rolesMessage);
        }else{
            await interaction.reply("Vous n'avez pas les permissions pour utiliser cette commande !")
        }
	},
};