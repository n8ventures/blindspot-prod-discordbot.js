const { ActivityType } = require('discord.js');

module.exports = (client) => {
	client.pickPresence = async () => {
		const options = [
			{
				type: ActivityType.Watching,
				text: 'n8 coding badly lmao',
				status: 'dnd',
			},
			{
				type: ActivityType.Listening,
				text: 'you for slash (/) commands.',
				status: 'idle',
			},
			{
				type: ActivityType.Playing,
				text: 'with flashbangs',
				status: 'online',
			},
			{
				type: ActivityType.Playing,
				text: 'Adonis Simulator',
				status: 'online',
			},
			{
				type: ActivityType.Listening,
				text: 'Broke Neito',
				status: 'dnd',
			},
			{
				type: ActivityType.Listening,
				text: '$aucepekt',
				status: 'online',
			},
			{
				type: ActivityType.Watching,
				text: 'Manokii being pogi',
				status: 'dnd',
			},
			{
				type: ActivityType.Listening,
				text: 'Onzo\'s guitar riffs',
				status: 'dnd',
			},
		];
		const option = Math.floor(Math.random() * options.length);

		client.user.setPresence({
			activities: [
				{
					name: options[option].text,
					type: options[option].type,
				},
			],
			status: options[option].status,
		});
	};
};
