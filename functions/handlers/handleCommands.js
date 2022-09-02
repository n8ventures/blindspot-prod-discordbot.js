const { REST } = require('@discordjs/rest');
const { Routes } = require('discord.js');
const { clientId, token } = require('../../config.json');
const fs = require('node:fs');
let commandlist;
module.exports = (client) => {
	client.handleCommands = async () => {
		const commandFolders = fs.readdirSync('./commands');
		for (const folder of commandFolders) {
			const commandFiles = fs
				.readdirSync(`./commands/${folder}`)
				.filter((file) => file.endsWith('.js'));

			const { commands, commandArray } = client;

			for (const file of commandFiles) {
				const command = require(`../../commands/${folder}/${file}`);
				commands.set(command.data.name, command);
				commandArray.push(command.data.toJSON());
			}
			commandlist = commandArray;
		}

		const rest = new REST({ version: '10' }).setToken(token);

		try {
			console.log(`Started refreshing ${commandlist.length} application (/) commands.`);
			// deploys global commands
			await rest.put(Routes.applicationCommands(clientId), {
				body: client.commandArray,
			});

			console.log(`Successfully reloaded ${commandlist.length} application (/) commands.`);
		}
		catch (error) {
			console.error(error);
		}
	};
};
