import { promises as fs } from 'fs';
import * as path from 'path';
export default class Util {
    constructor(mia) {
        this.mia = mia;
    }
    async load(filePath) {
        const fullPath = path.isAbsolute(filePath) ?
            filePath :
            `${this.mia.botdir}/${filePath}`;
        const data = await fs.readFile(fullPath);
        return JSON.parse(data.toString());
    }
    loadData(filePath) {
        return this.load(`data/${filePath}`);
    }
}
