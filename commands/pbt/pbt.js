const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');
const programMessage = require("./programMessage.json")

const getDownloadCount = async () => {
    try {
        const response = await axios.get('https://api.github.com/repos/LouisMazin/Palworld_Breeding_Tree/releases', {
            headers: {
                'Accept': 'application/vnd.github.v3+json',
                'User-Agent': 'Palworld-Discord-Bot'
            }
        });
        
        let totalDownloads = 0;
        
        // Sum up downloads from all releases
        for (const release of response.data) {
            for (const asset of release.assets) {
                totalDownloads += asset.download_count;
            }
        }
        
        return totalDownloads;
    } catch (error) {
        console.log('Erreur lors de la récupération du nombre de téléchargements:', error.message);
        return null;
    }
};

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
		const downloadCount = await getDownloadCount();
		
		// Clone the message to avoid modifying the original
		const message = JSON.parse(JSON.stringify(programMessage));
		
		// Add download count to the embed description
		if (downloadCount !== null) {
			message.description = message.description.replace("X", downloadCount.toString()).replace("Y", (downloadCount + 1).toString());
		}
		
		message.content = user ? "||<@"+user.id+">||" : "";
		await interaction.reply(message);
	},
};