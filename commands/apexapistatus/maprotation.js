const { EmbedBuilder } = require('discord.js');
const { SlashCommandBuilder } = require('discord.js');
const moment = require('moment-timezone');
const apexapitoken = require('./apexapitoken.json');
const fetch = require('node-fetch');
const ApexAPIToken = apexapitoken.apexapi;
const ApexMapAPI = 'https://api.mozambiquehe.re/maprotation?auth=';


module.exports = {
	data: new SlashCommandBuilder()
		.setName('maprotation')
		.setDescription('shows current Apex Legends Map Rotation'),
	async execute(interaction) {
		const GrabMapRotation = ApexMapAPI + ApexAPIToken;
		const MapRotate = await fetch(GrabMapRotation)
			.then(res => res.json());
		// console.log(Object.keys(MapRotate).length);
		if (!Object.keys(MapRotate).length) {
			await interaction.reply('Connection Timeout. Please Try Again Later.');
		}
		const c_icon = MapRotate.current.asset;
		const c = MapRotate.current;
		const n = MapRotate.next;
		// Epoch to date converter
		// const cs = moment.tz(c.start * 1000, 'Asia/Manila').format('h:mm A');
		// const ce = moment.tz(c.end * 1000, 'Asia/Manila').format('h:mm A');
		const ns = moment.tz(n.start * 1000, 'Asia/Manila').format('h:mm A');
		const ne = moment.tz(n.end * 1000, 'Asia/Manila').format('h:mm A');

		const MapRotationEmbed = new EmbedBuilder()
			.setColor('#0099ff')
			.setTitle('Apex Map Rotation')
			.setAuthor({ name: 'N8VENTURES', iconURL: 'https://cdn.discordapp.com/icons/385725723572174848/379b403ecd240e2b4f577936ec66dac6.webp', url: 'https://twitter.com/n8ventures_' })
			.setThumbnail('https://apexlegendsapi.com/images/logo.png')
			.addFields(
				{ name: 'Current Map', value: c.map },
				{ name: 'Time', value: `<t:${c.end}:R>` },
				{ name: '\u200B', value: '\u200B' },
				{ name: 'Next Map', value: n.map, inline: true },
				{ name: 'Starting at', value: ns, inline: true },
				{ name: 'ending at', value: ne, inline: true },
			)
			.setImage(c_icon)
			.setTimestamp()
			.setFooter({ text: 'Built by N8VENTURES. API by Apex Legends Status', iconURL: 'https://cdn.discordapp.com/icons/385725723572174848/379b403ecd240e2b4f577936ec66dac6.webp' });


		await interaction.reply({ embeds: [MapRotationEmbed] });
	},
};

