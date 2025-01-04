const { SlashCommandBuilder } = require('discord.js');
const rolesMessage = require("./rolesMessage.json")


module.exports = {
	data: new SlashCommandBuilder()
		.setName('roles')
		.setDescription('Affichez le message qui permet de choisir un rôle !'),
	async execute(interaction) {
        const memberTarget = interaction.guild.members.cache.get(interaction.member.user.id);
        console.log(memberTarget);
        if (memberTarget.roles.cache.some(role => role.name === 'Modo' || role.name== 'Boss')) {
            await interaction.reply(rolesMessage);
        }else{
            await interaction.reply("Vous n'avez pas les permissions pour utiliser cette commande !")
        }
	},
};