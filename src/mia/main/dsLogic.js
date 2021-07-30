import Discord from "discord.js";

export default class dsWorker {
    constructor(mia) {
        this.client = new Discord.Client();
        this.discord = Discord;
        this.mia = mia;
    }

    async init() {
        this.client.login(this.mia.config.configData[0].token).catch((err) => {
            throw Error(`Error on token bot in config.json (${err.message})`)
        })
    }
    async start() {
        this.client.on('ready', () => {
            this.setPresence();
            this.client.users.fetch('426082591515475978').then((ms) => {
                this.mia.logger.system(`Author by ${ms.username}#${ms.discriminator}`);
            }).then(() => {
                this.mia.logger.info(`Logged in as ${this.client.user.tag}.`);
            });
        })
        this.client.on('message', ctx => {
            if (ctx.author.bot) return;
            this.mia.ctxLogic.apply(ctx);
            let cm  = this.mia.aliases.get(ctx.content.split(' ')[0].slice(this.mia.config.configData[0].prefix.length))
            if(!cm) return;
            cm.handler(ctx)
        })
        this.client.on('guildCreate', (rs) => {
            this.setPresence()
        });
        this.client.on('guildDelete', (rs) => {
            this.setPresence()
        });
    }

    setPresence() {
        this.client.user.setPresence({
            status: 'online',
            activity: {
                type: 'PLAYING',
                name: this.mia.config.configData[0].prefix + 'help' + ' | ' + `${this.client.guilds.cache.size} servers`
            }
        }).then((ms) => {
            this.mia.logger.log("The status has been updated.")
        })
    }
}