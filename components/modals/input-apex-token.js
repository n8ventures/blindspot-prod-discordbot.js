const fs = require('node:fs');
const startdatafetch = require('../../commands/apextournamentapi/apexoptions/apexscripts/data-fetch');

module.exports = {
	data: {
		name: 'input-apex-token',
	},
	async execute(interaction, client) {
		await interaction.update({
			content: 'executing command...',
			components: [],
		});

		const ApexTokenInput =
      interaction.fields.getTextInputValue('ApexStatToken');

		const jsonContent = JSON.stringify(ApexTokenInput);
		fs.writeFileSync(
			'./commands/apextournamentapi/apexoptions/apexmodules/apexstattoken.json',
			jsonContent,
		);

		await startdatafetch.execute(interaction, client);
	},
};
