const {
	ModalBuilder,
	ActionRowBuilder,
	TextInputBuilder,
	TextInputStyle,
} = require('discord.js');

module.exports = {
	name: 'apex-modal-input',
	async execute(interaction) {

		const modal = new ModalBuilder()
			.setCustomId('input-apex-token')
			.setTitle('Apex Tournament API Results');

		const textInput = new TextInputBuilder()
			.setCustomId('ApexStatToken')
			.setLabel('Input the Stat Token Here.')
			.setPlaceholder('Input the Stat Token Here.')
			.setRequired(true)
			.setStyle(TextInputStyle.Short);

		const row = new ActionRowBuilder().addComponents(textInput);
		modal.addComponents(row);

		await interaction.showModal(modal);
	},
};
