const fs = require('node:fs');
const dataFetchTotal = require('../../commands/apextournamentapi/apexoptions/apexscripts/data-fetch-total');
const wait = require('node:timers/promises').setTimeout;
module.exports = {
	data: {
		name: 'apexapi-menu-total',
	},
	async execute(interaction, client) {
		const ApexOptions = interaction.values[0];
		const jsonContent = JSON.stringify(ApexOptions);
		fs.writeFileSync(
			'./commands/apextournamentapi/apexoptions/apexmodules/apexindex.json',
			jsonContent,
		);
		await interaction.update({
			content: `Alrighty. Indexing by **${interaction.values[0]}**`,
			components: [],
		});
		await wait(1000);
		await dataFetchTotal.execute(interaction, client);
	},
};
