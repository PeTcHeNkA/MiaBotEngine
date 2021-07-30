export default class ReloadCommand { 
    name = "reload"
    description = "Reload system"

    async handler(ctx) {
        ctx.channel.send("Reloading bot").then(() => {
            console.log(" ")
            ctx.mia.logger.system("RELOAD BOT.")
            console.log(" ")
            process.exit(47)
        })
    }
}