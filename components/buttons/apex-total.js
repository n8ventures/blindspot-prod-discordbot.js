const menuApextotal = require('../../commands/apextournamentapi/apexoptions/apexmodules/menu-apextotal');
const wait = require('node:timers/promises').setTimeout;
module.exports = {
	data: {
		name: 'apex-total',
	},
	async execute(interaction, client) {
		await interaction.update({
			content: '**Use at your own risk!**',
			components: [],
			ephemeral: true,
		});
		await wait(1000);
		await menuApextotal.execute(interaction, client);
	},
};
