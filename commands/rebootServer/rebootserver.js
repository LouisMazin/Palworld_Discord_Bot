const { SlashCommandBuilder} = require('discord.js');
const axios = require('axios');
let restart = {method: 'post',maxBodyLength: Infinity,url: 'http://play.louismazin.ovh:1025/v1/api/shutdown',headers: { 'Accept': 'application/json', 'Authorization': 'Basic YWRtaW46Y2FjYXBpcGlkdTc5'},data : JSON.stringify({"waittime": 10,"message": "Redémarrage forcé, ça revient dans 10 secondes" })};

module.exports = {
	data: new SlashCommandBuilder()
		.setName('rebootserver')
		.setDescription('Redémarrez le serveur Palworld Steam !'),
	async execute(interaction) {
        membre = interaction.member
        roles = membre.roles
        rolecache = roles.cache
        if (rolecache.some(role => role.name === 'Modo' || role.name== 'Boss')) {
            axios(restart)
            .then(() => {
            interaction.reply("Le serveur redémarre ! 🔄")
            })
            .catch((error) => {
            console.log(error);
            });
        }else{
            interaction.reply("Et non ! Tu n'est pas développeur ! 😝")
        }
    }
};