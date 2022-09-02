const modalApexresults = require('../../commands/apextournamentapi/apexoptions/apexmodules/modal-apexresults');
const fs = require('node:fs');
// const wait = require('node:timers/promises').setTimeout;

module.exports = {
	data: {
		name: 'apexapi-menu',
	},
	async execute(interaction, client) {
		const ApexOptions = interaction.values[0];
		const jsonContent = JSON.stringify(ApexOptions);
		fs.writeFileSync(
			'./commands/apextournamentapi/apexoptions/apexmodules/apexoption.json',
			jsonContent,
		);

		await modalApexresults.execute(interaction, client);
	},
};
