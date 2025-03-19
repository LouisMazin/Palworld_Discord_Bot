const axios = require('axios');
const fs = require('node:fs');
const path = require('node:path');
const deploy = require('./deploy_command.js')
const update  = require('./displayer.js');
const { Client, GatewayIntentBits, Collection, Events } = require('discord.js');

const client = new Client({ intents: [GatewayIntentBits.GuildMembers,GatewayIntentBits.GuildMessages] });
const args = process.argv;
const token = args[2].toString();
const headers = {
    "Accept": "application/json",
    "Content-Type": "application/json",
    "Authorization": "Bearer "+args[3].toString()
};
const bot_guilds = [{"name" : "Crashtest", "steam":"1256341578687975506", "xbox": "1327793004433510440"},{"name" : "Rygain", "steam":"1263481798667796623", "xbox":"1327792448449019965"}];
const numbers=["𝟎","𝟏","𝟐","𝟑","𝟒","𝟓","𝟔","𝟕","𝟖","𝟗","𝟏𝟎","𝟏𝟏","𝟏𝟐","𝟏𝟑","𝟏𝟒","𝟏𝟓","𝟏𝟔","𝟏𝟕","𝟏𝟖","𝟏𝟗","𝟐𝟎","𝟐𝟏","𝟐𝟐","𝟐𝟑","𝟐𝟒","𝟐𝟓","𝟐𝟔","𝟐𝟕","𝟐𝟖","𝟐𝟗","𝟑𝟎","𝟑𝟏","𝟑𝟐"];

client.commands = new Collection();
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		// Set a new item in the Collection with the key as the command name and the value as the exported module
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}
const welcomeDM = require("./welcomeDM.json")

client.on('guildMemberAdd', async member => {
    try {
        await member.send(welcomeDM);
		console.log(`Message envoyé à ${member.user.tag}`);
    } catch (error) {
        console.error(`Impossible d'envoyer le message à ${member.user.tag}:`, error);
    }
});

client.on('ready', () => {
  console.log('Bot started !');
  deploy(token);
  client.user.setPresence({ activities: [{ name: 'des vidéos de Rygain.', type: 'WATCHING' }], status: 'online' });
});

client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
		} else {
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	}
});

client.login(token);

setInterval(()=>{update(headers,numbers,client)}, 6000);