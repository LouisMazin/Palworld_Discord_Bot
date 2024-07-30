const { SlashCommandBuilder } = require("discord.js");
const Observer = require('./observer.js');
module.exports = {
    data: new SlashCommandBuilder()
            .setName("forceReboot")
            .setDescription("Redémarre le serveur !"),
    async execute(interaction){
        await Observer.saveServer();
    }
}