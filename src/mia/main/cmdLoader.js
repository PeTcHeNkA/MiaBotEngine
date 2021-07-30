import readdirp from 'readdirp';
import path from 'path';

export default class cmdLoader {
    constructor(mia) {
        this.mia = mia;
    }
    async loadCommands() {
        this.commandList = await readdirp.promise('./src/commands');
        this.commands = await Promise.all(this.commandList.map(v => this.loadCommand(v.fullPath)));
        this.mia.logger.log(`Commands loaded succesfully (${this.commands.length}).`);
    }

    async loadCommand(filePath) {
        this.compiledFilePath = filePath;
        try {
            this.commandModule = await import(`file:///${this.compiledFilePath}`);
            this.CommandClass = this.commandModule.default || this.commandModule;
            this.command = new this.CommandClass();
            this.command.type = path.basename(path.dirname(this.compiledFilePath))
            this.command.path = this.compiledFilePath;
            this.command.slug = path.basename(this.compiledFilePath, '.js');
            this.setCommandAliases(this.command);
            return this.command;
        } catch (error) {
            throw Error(`Command error (${path.basename(this.compiledFilePath, '.js')}):\n${error.stack}`);
        }
    }

    async setCommandAliases(command) {
        this.mia.aliases.set(command.name, command);
        if (command.aliases) {
            command.aliases.forEach(v => {
                this.mia.aliases.set(v, command);
            });
        }
        if (command.subcommands) {
            command.subcommands.forEach(v => {
                this.mia.aliases.set(`${command.name} ${v.name}`, v);
                if (v.aliases) {
                    v.aliases.forEach(v2 => {
                        this.mia.aliases.set(`${command.name} ${v2}`, v);
                    });
                }
            });
            if (command.aliases) {
                command.aliases.forEach(v => {
                    command.subcommands.forEach(b => {
                        this.mia.aliases.set(`${v} ${b.name}`, b);
                        if (b.aliases) {
                            b.aliases.forEach(n => {
                                this.mia.aliases.set(`${v} ${n}`, b);
                            });
                        }
                    });
                });
            }
        }
    }
}