module.exports = {
	data: {
		name: 'apex-more-info',
	},
	async execute(interaction) {
		await interaction.reply({
			content:
        'Okay, so here\'s the deal.\n\nThe problem with this feature is because this is heavily relied on user input.Not from me, the dev, but from how the lobby is set up and how the players input their team names or if they try to switch things up.\n\nI designed this experimental feature to match team names based on the amount of matches in that one lobby token. If, on the following matches,the players input their team name wrong, you\'ll have to look more closely, find the error, and calculate it by yourself.\n You can also index it with team numbers instead, but that depends if the players stay their place on the entire duration of that apex lobby.if they switch, then you\'ll be looking at weirdly merged data from different teams based on the team number.\n\n*TLDR: feature looks for team name or team number in matches, and if there\'s an error like typos, switched places or whatever, you\'re gonna see some messy data on the embed.*\n\n if you have more questions, please don\'t hesistate to DM me, <@344606551476011029>',
			ephemeral: true,
		});
	},
};
