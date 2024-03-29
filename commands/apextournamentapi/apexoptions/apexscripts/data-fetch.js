const fetch = require('node-fetch');
const wait = require('node:timers/promises').setTimeout;
const { EmbedBuilder } = require('discord.js');
const moment = require('moment-timezone');
const buttonApextotal = require('../apexmodules/button-apextotal');
const apexRetry = require('../../retrymodules/apex-retry');

const fs = require('node:fs');
const apexTokenJson = fs.readFileSync(
	'./commands/apextournamentapi/apexoptions/apexmodules/apexstattoken.json',
	{ encoding: 'utf8', flag: 'r' },
);
const apexToken = JSON.parse(apexTokenJson);
const apexAPI =
  'https://r5-crossplay.r5prod.stryder.respawn.com/privatematch/?token=';
const grabData = apexAPI + apexToken;

// ------------------------------------------------
// json sample
// const grabData = 'https://cdn.discordapp.com/attachments/1012925033045303426/1013421914036899860/apex_sample.json';
// empty json
// const grabData = 'https://cdn.discordapp.com/attachments/1012925033045303426/1013442499387330580/apexoption.json';
// ------------------------------------------------

module.exports = {
	data: {
		name: 'datafetch',
	},
	async execute(interaction, client) {
		const url = grabData;
		await fetch(url)
			.then((res) => res.json())
			.then(async (json) => {
				let x = 0;
				let m = -1;
				let n = 0;
				let b = 0;

				function isEmpty(obj) {
					return Object.keys(obj).length === 0;
				}

				if (isEmpty(json)) {
					await interaction.editReply({
						content:
              '**⚠   MATCHES NOT DETECTED!   ⚠** \n\n**⚠  PLEASE INPUT CORRECT TOKEN OR WAIT FOR THE MATCH TO FINISH!!!**  ⚠',
						ephemeral: true,
					});
					await apexRetry.execute(interaction, client);
				}
				else {
					for (; x < json.matches.length;) {
						x++;
					}
					if (x === 1) {
						await interaction.editReply(
							'***' + x + ' MATCH FOUND!' + '*** ' + ' ✅',
						);
					}
					else {
						await interaction.editReply(
							'***' + x + ' MATCHES FOUND!' + '*** ' + ' ✅',
						);
					}
					await wait(1000);
					await interaction.editReply('*Loading matches...* ⌛\n');
					await wait(2000);
					while (m < x - 1) {
						m++;
						n++;
						b--;
						// epoch converter
						const mt = [];
						const match_time = json.matches.map((t) => t);

						match_time.forEach((time) => {
							if (mt.some((e) => e.match_start === time.match_start)) {
								const u = mt.findIndex(
									(e) => e.match_start === time.match_start,
								);

								mt[u] = {
									match_start: mt[u].match_start,
								};
							}
							else {
								mt.push({
									match_start: time.match_start,
								});
							}
						});
						const date_select = mt.slice(m, n);
						const datestrng = JSON.stringify(date_select);
						const res = datestrng.replace(/\D/g, '');
						const unixTimestamp = res;
						const date = new Date(unixTimestamp * 1000);
						const nt = moment
							.tz(date, 'Asia/Manila')
							.format('YYYY-MM-DD h:mm A ZZ');

						const match = [];
						let pp = 0;
						const tp = 0;
						// eslint-disable-next-line no-shadow
						const matches = json.matches[m]?.player_results.map((m) => m);
						matches?.forEach((player) => {
							if (match.some((p) => p.teamName === player.teamName)) {
								const i = match.findIndex(
									(p) => p.teamName === player.teamName,
								);
								// placement points
								switch (match[i].teamPlacement) {
								case 1:
									pp = 12;
									break;
								case 2:
									pp = 9;
									break;
								case 3:
									pp = 7;
									break;
								case 4:
									pp = 5;
									break;
								case 5:
									pp = 4;
									break;
								case 6:
								case 7:
									pp = 3;
									break;
								case 8:
								case 9:
								case 10:
									pp = 2;
									break;
								case 11:
								case 12:
								case 13:
								case 14:
								case 15:
									pp = 1;
									break;
								case 16:
								case 17:
								case 18:
								case 19:
								case 20:
									pp = 0;
									break;
								}

								match[i] = {
									teamName: match[i].teamName,
									kills: match[i].kills + player.kills,
									teamPlacement: player.teamPlacement,
									PlacementPoints: pp,
									TotalPoints: match[i].kills + player.kills + pp,
									playerName: [...match[i].playerName, player.playerName],
									teamNum: match[i].teamNum,
								};
							}
							else {
								match.push({
									teamName: player.teamName,
									kills: player.kills,
									teamPlacement: player.teamPlacement,
									PlacementPoints: pp,
									TotalPoints: tp,
									playerName: [player.playerName],
									teamNum: player.teamNum,
								});
							}
						});
						const placements = match.sort(function(a, c) {
							return c.TotalPoints - a.TotalPoints;
						});

						// save matches to json files
						const jsonContent = JSON.stringify(placements);
						fs.writeFileSync(
							`./commands/apextournamentapi/apexoptions/apexscripts/matches/match_${m}.json`,
							jsonContent,
						);

						const optionJson = fs.readFileSync(
							'./commands/apextournamentapi/apexoptions/apexmodules/apexoption.json',
							{ encoding: 'utf8', flag: 'r' },
						);

						let color;
						let fields;
						const option = JSON.parse(optionJson);
						switch (option) {
						case 'first_option':
							color = 0x0099ff;
							fields = placements.map((p) => ({
								name: `🏴‍☠️ ${p.teamName}`,
								value: `☠️ Kills: ${p.kills} 
									👟 Placement: ${p.teamPlacement}
									🏅 **Total Points: ${p.TotalPoints}** \n ------------------------`,
							}));
							break;
						case 'second_option':
							color = 0xff9900;
							fields = placements.map((p) => ({
								name: `🏴‍☠️ ${p.teamName}`,
								value: `#️⃣  Team Number ${p.teamNum}
								🔥 Players: \n\t ${p.playerName.join('\n\t')}
								☠️ Kills: ${p.kills}
								👟 Placement: ${p.teamPlacement}
								🏅 **Total Points: ${p.TotalPoints}** \n ------------------------`,
							}));
							break;
						case 'third_option':
							color = 0x00ffff;
							fields = placements.map((p) => ({
								name: `🏴‍☠️ ${p.teamName}`,
								value: `🏅 **Total Points: ${p.TotalPoints}** \n ------------------------`,
							}));
							break;
						}

						const ResultsEmbed = new EmbedBuilder()
							.setColor(color)
							.setTitle(
								'Apex Tournament API Discord Bot \n' +
                  '**🎲 MATCH **' +
                  parseInt(parseInt(x) + parseInt(b) + parseInt(1)) +
                  '\n 🕒 ' +
                  nt,
							)
							.setAuthor({
								name: '🔻 N8VENTURES (with help from Manokii🐔) 🔻',
								iconURL:
                  'https://cdn.discordapp.com/attachments/407797217697726464/1013433127823224943/icon.png',
							})
							.setThumbnail(
								'https://media.discordapp.net/attachments/407797217697726464/1013432911158054973/Colored_White_cropped.png',
							)
							.addFields(fields)
							.setFooter({
								text: '🔻N8VENTURES x 🐔Manokii 2022',
								iconURL:
                  'https://cdn.discordapp.com/attachments/407797217697726464/1013433127823224943/icon.png',
							})
							.setTimestamp();

						await wait(1000);
						await interaction.followUp({ embeds: [ResultsEmbed] });
					}
					switch (m == x - 1) {
					case 1:
						await wait(1000);
						await interaction.editReply(
							'\n **🎉   MATCH LOADED   🎉**\n',
						);
						await interaction.followUp({
							content: `\n **🎉   MATCH LOADED, ${interaction.user}   🎉**\n`,
							ephemeral: true,
						});

						json = [];
						break;
					default:
						await wait(2000);
						await interaction.editReply(
							'\n **🎉   ALL MATCHES LOADED   🎉**\n',
						);
						await interaction.followUp({
							content: `\n **🎉   ALL MATCHES LOADED, ${interaction.user}  🎉**\n`,
							ephemeral: true,
						});
						await wait(1000);
						await buttonApextotal.execute(interaction, client);
						json = [];
					}

				}
			});
	},
};
