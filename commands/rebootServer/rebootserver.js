const { SlashCommandBuilder} = require('discord.js');
const axios = require('axios');
let message = {method: 'post',maxBodyLength: Infinity,url: 'http://play.louismazin.ovh:1025/v1/api/announce',headers: { 'Accept': 'application/json', 'Authorization': 'Basic YWRtaW46Y2FjYXBpcGlkdTc5'},data : JSON.stringify({"message": "Le serveur redémarre, ça revient dans 10 secondes" })};
let shutdown = {method: 'post',maxBodyLength: Infinity,url: 'http://play.louismazin.ovh:1025/v1/api/stop',headers: { 'Accept': 'application/json', 'Authorization': 'Basic YWRtaW46Y2FjYXBpcGlkdTc5'}};
module.exports = {
	data: new SlashCommandBuilder()
		.setName('rebootserver')
		.setDescription('Redémarrez le serveur Palworld Steam !'),
	async execute(interaction) {
        axios(message)
        .then(() => {
            setTimeout(() => {
                axios(shutdown)
                .then(() => {
                    interaction.reply("Le serveur redémarre ! 🔄")
                })
                .catch((error) => {
                    console.log(error);
                });
            }, 10000);
        })
        .catch((error) => {
        console.log(error);
        });
    }
};