const { SlashCommandBuilder } = require('discord.js');
const welcomeMessage = require("./welcomeMessage.json")


module.exports = {
	data: new SlashCommandBuilder()
		.setName('bienvenue')
		.setDescription('Souhaitez la bienvenue !')
		.addUserOption(option =>
			option.setName('user')
				.setDescription('Utilisateur à mentionner')
				.setRequired(false)),
	async execute(interaction) {
		const user = interaction.options.getUser('user');
		
		// Clone welcomeMessage to avoid modifying the original
		const response = JSON.parse(JSON.stringify(welcomeMessage));
		
		// If a user is mentioned, add their mention to the content
		if (user) {
			if (!response.content) response.content = "";
			response.content = `<@${user.id}> ${response.content}`;
			
			// Make sure allowedMentions only mentions the tagged user
			response.allowedMentions = {
				users: [user.id]
			};
		}
		
		// Send as a regular message so both users can see it
		await interaction.reply(response);
	},
};