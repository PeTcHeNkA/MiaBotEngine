export default class HelpCommand {
    name = "help"
    description = "Send commands list"

    async handler(ctx) {
        let embed = new ctx.ds.MessageEmbed()
            .setColor('#4682B4')
            .setTitle(":mortar_board: Commands")
            .setDescription(ctx.mia.cmdLoader.commands.map(v => `**• ${ctx.mia.config.configData[0].prefix}${v.name} - ${v.description}**`))
        ctx.channel.send(embed)
    }
}