const wait = require('node:timers/promises').setTimeout;
const { EmbedBuilder } = require('discord.js');
const fs = require('node:fs');
const path = require('path');

module.exports = {
	data: {
		name: 'datafetch-total',
	},
	async execute(interaction) {
		await wait(1000);
		await interaction.editReply('*Calculating matches...* ⌛\n');
		await wait(2000);

		// reads and concats match json files
		const matchjsonscount = fs
			.readdirSync(
				'./commands/apextournamentapi/apexoptions/apexscripts/matches',
			)
			.filter((file) => file.endsWith('.json')).length;

		let matchnum = 0;
		let matchjson = [];
		let json = [];
		const matchdir = './commands/apextournamentapi/apexoptions/apexscripts/matches/';

		for (; matchnum < matchjsonscount; matchnum++) {
			matchjson = JSON.parse(
				fs.readFileSync(
					`${matchdir}/match_${matchnum}.json`,
					{ encoding: 'utf8', flag: 'r' },
				),
			);
			json = json.concat(matchjson);
		}


		const index = fs.readFileSync(
			'./commands/apextournamentapi/apexoptions/apexmodules/apexindex.json',
			{ encoding: 'utf8', flag: 'r' },
		);
		const apexindex = JSON.parse(index);

		const match = [];
		let placements;
		// eslint-disable-next-line no-shadow
		const matches = json.map((d) => d);
		matches.forEach((tm) => {
			switch (apexindex) {
			case 'teamName':
				// find and merge from teamName
				if (match.some((p) => p.teamName === tm.teamName)) {
					const i = match.findIndex((p) => p.teamName === tm.teamName);

					match[i] = {
						teamName: match[i].teamName,
						kills: match[i].kills + tm.kills,
						teamPlacement: [...match[i].teamPlacement, tm.teamPlacement],
						PlacementPoints: match[i].PlacementPoints + tm.PlacementPoints,
						TotalPoints: match[i].TotalPoints + tm.TotalPoints,
						playerName: match[i].playerName,
						teamNum: [...match[i].teamNum, tm.teamNum],
					};
				}
				else {
					match.push({
						teamName: tm.teamName,
						kills: tm.kills,
						teamPlacement: [tm.teamPlacement],
						PlacementPoints: tm.PlacementPoints,
						TotalPoints: tm.TotalPoints,
						playerName: tm.playerName,
						teamNum: [tm.teamNum],
					});
				}
				placements = match.sort(function(a, b) {
					const tna = a.teamName.toLowerCase(),
						tnb = b.teamName.toLowerCase();
					if (tna < tnb) {
						return -1;
					}
					if (tna > tnb) {
						return 1;
					}
					return 0;
				});
				break;
			case 'teamNumber':
				// find and merge from team number
				if (match.some((p) => p.teamNum === tm.teamNum)) {
					const i = match.findIndex((p) => p.teamNum === tm.teamNum);

					match[i] = {
						teamName: [...new Set([...match[i].teamName, tm.teamName])],
						kills: match[i].kills + tm.kills,
						teamPlacement: [...match[i].teamPlacement, tm.teamPlacement],
						PlacementPoints: match[i].PlacementPoints + tm.PlacementPoints,
						TotalPoints: match[i].TotalPoints + tm.TotalPoints,
						playerName: tm.playerName,
						teamNum: match[i].teamNum,
					};
				}
				else {
					match.push({
						teamName: [tm.teamName],
						kills: tm.kills,
						teamPlacement: [tm.teamPlacement],
						PlacementPoints: tm.PlacementPoints,
						TotalPoints: tm.TotalPoints,
						playerName: tm.playerName,
						teamNum: tm.teamNum,
					});
				}
				placements = match.sort(function(a, c) {
					return c.TotalPoints - a.TotalPoints;
				});
				break;
			}
		});

		const optionJson = fs.readFileSync(
			'./commands/apextournamentapi/apexoptions/apexmodules/apexoption.json',
			{ encoding: 'utf8', flag: 'r' },
		);
		const option = JSON.parse(optionJson);

		let color;
		switch (option) {
		case 'first_option':
			color = 0x0099ff;
			break;
		case 'second_option':
			color = 0xff9900;
			break;
		case 'third_option':
			color = 0x00ffff;
			break;
		}

		const all_embeds = [];
		let f = 0;
		let l = 0;
		for (l of placements) {
			if (!all_embeds[Math.floor(f / 25)]) {
				all_embeds.push(
					new EmbedBuilder()
						.setColor(color)
						.setTitle(
							'Apex Tournament API Discord Bot \n' + '**🎲 ALL MATCHES **',
						)
						.setAuthor({
							name: '🔻 N8VENTURES (with help from Manokii🐔) 🔻',
							iconURL:
                'https://cdn.discordapp.com/attachments/407797217697726464/1013433127823224943/icon.png',
						})
						.setThumbnail(
							'https://media.discordapp.net/attachments/407797217697726464/1013432911158054973/Colored_White_cropped.png',
						)
						.setFooter({
							text: '🔻N8VENTURES x 🐔Manokii 2022',
							iconURL:
                'https://cdn.discordapp.com/attachments/407797217697726464/1013433127823224943/icon.png',
						})
						.setTimestamp(),
				);
			}
			switch (option) {
			case 'first_option':
				switch (apexindex) {
				case 'teamName':
					all_embeds[Math.floor(f / 25)].addFields({
						name: `🏴‍☠️ ${l.teamName}`,
						value: `☠️ Kills: ${l.kills} 
											👟 Placements: ${l.teamPlacement.join(', ')}
											🏅 **Total Points: ${l.TotalPoints}** \n ------------------------`,
					});
					break;
				case 'teamNumber':
					all_embeds[Math.floor(f / 25)].addFields({
						name: `🏴‍☠️ ${l.teamName.join(' or ')}`,
						value: `☠️ Kills: ${l.kills} 
											👟 Placements: ${l.teamPlacement.join(', ')}
											🏅 **Total Points: ${l.TotalPoints}** \n ------------------------`,
					});
					break;
				}
				break;
			case 'second_option':
				switch (apexindex) {
				case 'teamName':
					all_embeds[Math.floor(f / 25)].addFields({
						name: `🏴‍☠️ ${l.teamName}`,
						value: `#️⃣  Team Number ${l.teamNum.join(', ')}
									🔥 Players: ${l.playerName.join(', ')}
									☠️ Kills: ${l.kills}
									👟 Placements: ${l.teamPlacement.join(', ')}
									🏅 **Total Points: ${l.TotalPoints}** \n ------------------------`,
					});
					break;
				case 'teamNumber':
					all_embeds[Math.floor(f / 25)].addFields({
						name: `🏴‍☠️ ${l.teamName.join(' or ')}`,
						value: `#️⃣  Team Number ${l.teamNum}
						🔥 Players: ${l.playerName.join(', ')}
						☠️ Kills: ${l.kills}
						👟 Placements: ${l.teamPlacement.join(', ')}
						🏅 **Total Points: ${l.TotalPoints}** \n ------------------------`,
					});
					break;
				}
				break;
			case 'third_option':
				switch (apexindex) {
				case 'teamName':
					all_embeds[Math.floor(f / 25)].addFields({
						name: `🏴‍☠️ ${l.teamName}`,
						value: `🏅 **Total Points: ${l.TotalPoints}** \n ------------------------`,
					});
					break;
				case 'teamNumber':
					all_embeds[Math.floor(f / 25)].addFields({
						name: `🏴‍☠️ ${l.teamName.join(' or ')}`,
						value: `🏅 **Total Points: ${l.TotalPoints}** \n ------------------------`,
					});
					break;
				}
				break;
			}
			f++;
		}

		await wait(1000);
		interaction.followUp({
			embeds: all_embeds,
		});
		await wait(2000);
		await interaction.editReply('\n **🎉   CALCULATED!   🎉**\n');
		await interaction.followUp({
			content: `\n **🎉   ALL MATCHES HAVE BEEN CALCULATED, ${interaction.user}  🎉**\n`,
			ephemeral: true,
		});

		// deletes match json files and clears json variable
		fs.readdir(matchdir, (err, files) => {
			if (err) throw err;

			for (const file of files) {
				fs.unlink(path.join(matchdir, file), err => {
					if (err) throw err;
				});
			}
		});
		json = [];
	},
};
