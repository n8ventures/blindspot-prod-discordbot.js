const { ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');
// const apexWaitingForResponse = require('../../../../components/buttons/apex-waiting-for-response');


module.exports = {
	data: { name: 'button-apextotal' },
	async execute(interaction) {

		// const seconds = 1;
		// const startingCount = 30;
		// let counter = startingCount;
		// const updateCounter = async () => {
		// 	await interaction.update({ content: `'Would you like me to try and calculate all matches? \n\n__**⚠️ WARNING: EXPERIMENTAL FEATURE!!! ⚠️**__\nIf you don't want to be confused with all these data, click "CANCEL" *or ignore this message* __*(including the button prompt)*__.\n *For more info, click the "I wanna learn more" button*\n\nThis message will self-destruct in ${counter} seconds`,
		// 		ephemeral: true });
		// 	counter -= seconds;
		// 	setTimeout(updateCounter, 1000 * seconds);
		// 	console.log(counter);
		// };
		const buttonYes = new ButtonBuilder()
			.setCustomId('apex-total')
			.setLabel('Gimme dat data!')
			.setStyle(ButtonStyle.Success);

		const buttonCancel = new ButtonBuilder()
			.setCustomId('apex-cancel')
			.setLabel('I\'m good.')
			.setStyle(ButtonStyle.Danger);

		const buttonMoreInfo = new ButtonBuilder()
			.setCustomId('apex-more-info')
			.setLabel('I wanna learn more')
			.setStyle(ButtonStyle.Primary);

		const row = new ActionRowBuilder().addComponents(
			buttonYes,
			buttonCancel,
			buttonMoreInfo,
		);


		await interaction.followUp({
			content: 'Would you like me to try and calculate all matches? \n\n__**⚠️ WARNING: EXPERIMENTAL FEATURE!!! ⚠️**__\nIf you don\'t want to be confused with all these data, click "CANCEL" *or ignore this message* __*(including the button prompt)*__.\n *For more info, click the "I wanna learn more" button*\n\nThis message will self-destruct in 30 seconds',
			components: [row],
			ephemeral: true,
		});
		// await updateCounter();
	},
};
