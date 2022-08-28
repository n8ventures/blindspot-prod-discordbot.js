const fs = require('node:fs');
const apexResults = require('../../commands/apextournamentapi/apexoptions/apexResults');

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
			'./commands/apextournamentapi/apexoptions/apexstattoken.json',
			jsonContent,
		);
		const optionJson = fs.readFileSync(
			'./commands/apextournamentapi/apexoptions/apexoption.json',
			{ encoding: 'utf8', flag: 'r' },
		);

		const option = JSON.parse(optionJson);
		console.log(`the value from the json is ${option}`);

		switch (option) {
		case 'first_option':
			await apexResults.execute(interaction, client);
			break;

		case 'second_option':
			await interaction.editReply({
				content: `you chose the second option: ${option}`,
				components: [],
			});
			break;

		case 'third_option':
			await interaction.editReply({
				content: `you chose the third option: ${option}`,
				components: [],
			});
			break;
		}
	},
};
