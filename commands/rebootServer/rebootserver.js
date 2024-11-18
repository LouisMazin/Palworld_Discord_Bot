const { SlashCommandBuilder, PermissionFlagsBits, RoleFlagsBitField } = require('discord.js');
const axios = require('axios');
let restart = {method: 'post',maxBodyLength: Infinity,url: 'http://play.louismazin.ovh:1025/v1/api/shutdown',headers: { 'Accept': 'application/json', 'Authorization': 'Basic YWRtaW46Y2FjYXBpcGlkdTc5'},data : JSON.stringify({"waittime": 10,"message": "La mémoire est pleine, le serveur redémarre dans 10 secondes. (ça prend 20 secondes)" })};

module.exports = {
	data: new SlashCommandBuilder()
		.setName('rebootserver')
		.setDescription('Redémarrez le serveur Palworld Steam !'),
	async execute(interaction) {
        console.log(interaction);
        console.log(interaction.member);
        console.log(interaction.member.roles);
        console.log(interaction.member.roles.cache);
        if(interaction.member.roles.cache.has('1308192450099286168')){
            axios(restart)
            .then(() => {
            })
            .catch((error) => {
            console.log(error);
            });
        }else{
            interaction.reply("Et non ! Tu n'est pas développeur ! 😝")
        }
    }
};