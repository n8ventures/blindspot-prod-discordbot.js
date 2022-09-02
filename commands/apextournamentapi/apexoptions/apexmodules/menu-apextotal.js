const fs = require('node:fs');
const { ActionRowBuilder, SelectMenuBuilder } = require('discord.js');

module.exports = {
	name: 'menu-apextotal',
	async execute(interaction) {
		const row = new ActionRowBuilder().addComponents(
			new SelectMenuBuilder()
				.setCustomId('apexapi-menu-total')
				.setPlaceholder('Select a method')
				.addOptions(
					{
						label: 'Index by Team Name',
						value: 'teamName',
					},
					{
						label: 'Index by Team Number',
						value: 'teamNumber',
					},
				),
		);

		const ApexOptionsClear = '';
		const jsonContent = JSON.stringify(ApexOptionsClear);
		fs.writeFileSync(
			'./commands/apextournamentapi/apexoptions/apexmodules/apexindex.json',
			jsonContent,
		);

		await interaction.editReply({ components: [row] });
	},
};
