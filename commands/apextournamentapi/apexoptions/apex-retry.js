// const modalApexresults = require('./modal-apexresults');

const menuApexresultsRetry = require('./menu-apexresults-retry');

module.exports = {
	data: {
		name: 'apex-retry',
	},
	async execute(interaction, client) {

		// await modalApexresults.execute(interaction, client);
		await menuApexresultsRetry.execute(interaction, client);

	},
};
