import * as path from 'path';
//Modules
import Config from './config.js';
import Logger from './logger.js';
import Util from './util.js';
import cmdLoader from './cmdLoader.js';
import dsLogic from './dsLogic.js';
import dbLogic from './dbLogic.js';
import ctxLogic from './ctxLogic.js'

export class Mia {
    constructor() {
        //Modules
        this.config = new Config(this);
        this.logger = new Logger(this);
        this.util = new Util(this);
        this.cmdLoader = new cmdLoader(this);
        this.dsLogic = new dsLogic(this);
        this.dbLogic = new dbLogic(this);
        this.ctxLogic = new ctxLogic(this);
        //Loggers
        this.log = (msg) => this.logger.log(msg);
        this.info = (msg) => this.logger.info(msg);
        this.warning = (msg) => this.logger.warning(msg);
        this.error = (msg) => this.logger.error(msg);
        this.system =(msg) => this.logger.system(msg);
        this.shutdownCallbacks = [];
        //Helpers
        this.botdir = path.resolve('.')
        this.aliases = new Map();
    }

    async init() {
        let packageData = await this.util.load(`${this.botdir}` + `/package.json`);
        try {
            this.info(`Mia v${packageData.version}.`)
            await this.config.init();
            await this.dbLogic.init();
            await this.dsLogic.init();
            process.on('uncaughtException', error => {
                this.error(`Runtime error: ${error.stack}`);
            });
        } catch (err) {
            this.error(`Bot init: ${err.stack}`)
            this.shutdown(1);
        }
    }

    async start() {
        try {
            await this.dsLogic.start();
            //this.dbLogic.start();
            await this.cmdLoader.loadCommands();
            await this.ctxLogic.start();
            process.on("SIGINT", () => this.shutdown());
            this.log('The bot is up and running.');
        } catch (error) {
            this.error(`Bot start: ${error.stack}`)
            this.shutdown(1);
        }
    }

    async shutdown(code = 0) {
        this.log(`Shutting down Mia.`)
        await Promise.all(this.shutdownCallbacks.map(v => v()));
        this.system('Exit.');
        process.exit(code);
    }
    onShutdown(cb) {
        this.shutdownCallbacks.push(cb);
    }
}