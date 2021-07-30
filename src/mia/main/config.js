import fs from 'fs';
export default class Config {
    constructor(mia) {
        this.mia = mia;
    }
    async init() {
        await this.start();
        this.configData = await Promise.all([
            this.mia.util.loadData('config.json'),
        ]);
        this.mia.logger.log(`Config loaded.`);
    }

    async start() {
        if (!fs.existsSync('./data')) {
            fs.mkdirSync('./data', (err) => {
                this.mia.logger.error(`Error to create folder: ${err.stack}`);
                process.exit();
            })
        }

        if (!fs.existsSync('./data/config.json')) {
            let content = JSON.stringify({
                prefix: "Your prefix for bot chat",
                token: "Token for bot from discord dev",
            }, null, 2);

            fs.writeFileSync('./data/config.json', content, 'utf8', (err) => {
                this.mia.logger.error(`Error to create config: ${err.stack}`);
                process.exit();
            });
            this.mia.logger.warning(`Edit the configuration in the directory data/config.json`);
            process.exit();
        }
    }
}