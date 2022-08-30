const modalApexresults = require('../../commands/apextournamentapi/apexoptions/apexmodules/modal-apexresults');
const fs = require('node:fs');
// const wait = require('node:timers/promises').setTimeout;

module.exports = {
	data: {
		name: 'apexapi-menu',
	},
	async execute(interaction, client) {
		// await interaction.deferReply();
		// await wait(1000);
		// await interaction.update({ content: 'Good choice.',
		// 	components: [],
		// });

		const ApexOptions = interaction.values[0];
		const jsonContent = JSON.stringify(ApexOptions);
		await fs.writeFileSync(
			'./commands/apextournamentapi/apexoptions/apexoption.json',
			jsonContent,
		);

		await modalApexresults.execute(interaction, client);

	},
};
