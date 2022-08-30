const fs = require('node:fs');
const {
	ActionRowBuilder,
	SelectMenuBuilder,
} = require('discord.js');
// const wait = require('node:timers/promises').setTimeout;

module.exports = {
	name: 'apexprivateresults-retry',

	async execute(interaction) {
		const row = new ActionRowBuilder().addComponents(
			new SelectMenuBuilder()
				.setCustomId('apexapi-menu-retry')
				.setPlaceholder('Select a method')
				.addOptions(
					{
						label: 'Apex Results',
						description:
              'Displays Kills, Placements, and Total Points each team per match.',
						value: 'first_option',
					},
					{
						label: 'Quick Apex Results',
						description:
              'Displays the usual but now includes team numbers and team names.',
						value: 'third_option',
					},
					{
						label: 'Full Apex Results',
						description: 'Only displays Total Points.',
						value: 'second_option',
					},
				),
		);
		const ApexOptionsClear = '';
		const jsonContent = JSON.stringify(ApexOptionsClear);
		fs.writeFileSync('./commands/apextournamentapi/apexoptions/apexmodules/apexoption.json', jsonContent);

		// await interaction.deferReply();
		// await wait(1000);
		await interaction.editReply({ components: [row] });
	},
};
