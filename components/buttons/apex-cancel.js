const fs = require('node:fs');
const path = require('path');
const matchdir = './commands/apextournamentapi/apexoptions/apexscripts/matches/';

module.exports = {
	data: {
		name: 'apex-cancel',
	},
	async execute(interaction) {
		await interaction.update({
			content: 'Cool, have fun calculating this data!',
			ephemeral: true,
			components: [],
		});

		return fs.readdir(matchdir, (err, files) => {
			if (err) throw err;
			for (const file of files) {
				fs.unlink(path.join(matchdir, file), err => {
					if (err) throw err;
				});
			}
		});
	},
};
