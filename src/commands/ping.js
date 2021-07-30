import fetch from "node-fetch";
export default class PingCommand {
	name = "ping";
	description = "Send ping status on server side"

	async handler(ctx) {
		const startTime = Date.now();
		await fetch('https://discord.com/api/');
		const ping = Date.now() - startTime;

		const result = new ctx.ds.MessageEmbed()
			.setColor('#43e2f7')
			.setTitle('✅ Bot is worked:')
			.setDescription(`⚠️ **Ping:  ${ping} ms.**`)
		ctx.channel.send(result)
	}
}