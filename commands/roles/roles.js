const { SlashCommandBuilder } = require('discord.js');
const rolesMessage = require("./rolesMessage.json")


module.exports = {
	data: new SlashCommandBuilder()
		.setName('roles')
		.setDescription('Affichez le message qui permet de choisir un rôle !'),
	async execute(interaction) {
        // if the user have the role 1068244966196903966 ou 1068244067772805271
        if(interaction.member.roles.cache.has(1068244966196903966n) || interaction.member.roles.cache.has(1068244067772805271n)){
            await interaction.reply(rolesMessage);
        }else{
            await interaction.reply("Vous n'avez pas les permissions pour utiliser cette commande !")
        }
	},
};