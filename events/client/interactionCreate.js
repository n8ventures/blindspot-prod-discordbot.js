module.exports = {
	name: 'interactionCreate',
	async execute(interaction, client) {
		console.log(`${interaction.user.tag} triggered an interaction`);

		if (interaction.isChatInputCommand()) {
			const { commands } = client;
			const { commandName } = interaction;
			const command = commands.get(commandName);
			if (!command) return;

			try {
				await command.execute(interaction, client);
			}
			catch (error) {
				console.error(error);
				await interaction.reply({
					content: 'There was an error while executing this command!',
					ephemeral: true,
				});
			}
		}
		else if (interaction.isSelectMenu()) {
			const { selectMenus } = client;
			const { customId } = interaction;
			const menu = selectMenus.get(customId);
			if (!menu) return new Error('no code in menu.');
			try {
				await menu.execute(interaction, client);
			}
			catch (error) {
				console.error(error);
			}
		}
		else if (interaction.isModalSubmit()) {
			const { modals } = client;
			const { customId } = interaction;
			const modal = modals.get(customId);
			if (!modal) return new Error('no code for this modal.');
			try {
				await modal.execute(interaction, client);
			}
			catch (error) {
				console.error(error);
			}
		}
		else if (interaction.isButton()) {
			const { buttons } = client;
			const { customId } = interaction;
			const button = buttons.get(customId);
			if (!button) return new Error('there is no code on this button');
			try {
				await button.execute(interaction, client);
			}
			catch (err) {
				console.error(err);
			}
		}
	},
};
