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
		
		// Clone programMessage to avoid modifying the original
		const response = JSON.parse(JSON.stringify(programMessage));
		
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