module.exports = {
	name: 'ready',
	once: true,
	async execute(client) {
		setInterval(client.pickPresence, 8 * 1000);
		console.log(`Ready! Logged in as ${client.user.tag}`);
	},
};