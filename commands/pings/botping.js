const { SlashCommandBuilder } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;

module.exports = {
	data: new SlashCommandBuilder()
		.setName('botping')
		.setDescription('get discord bot latency'),
	async execute(interaction, client) {
		await interaction.reply('🏓 *hehe*.');
		await wait(2000);
		await interaction.editReply(
			`\n 📡 **Latency** is __**${
				Date.now() - interaction.createdTimestamp - 2000
			}ms!**__ \n 🛰 **Discord API Latency** is __**${client.ws.ping}ms!**__`,
		);
	},
};
