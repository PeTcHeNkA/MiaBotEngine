import chalk from 'chalk';
export default class Logger {
    constructor(mia) {
        this.logFormat = chalk `{green [LOG]} `;
        this.warningFormat = chalk `{yellow [WRN]} - {yellow ⚠} `;
        this.errorFormat = chalk `{red [ERR]} - {red ❗} `;
        this.infoFormat = chalk `{blue [INF]} `;
        this.systemFormat = chalk `{magenta [SYS]} `;
        this.mia = mia;
    }
    log(message) {
        this.writeLine(this.logFormat + message);
    }
    warning(message) {
        this.writeLine(this.warningFormat + message);
    }
    error(message) {
        process.stderr.write(`${this.errorFormat}${message}\n`);
    }
    info(message) {
        this.writeLine(this.infoFormat + message);
    }
    system(message) {
        this.writeLine(this.systemFormat + message);
    }
    writeLine(str) {
        process.stdout.write(`${str}\n`);
    }
}
