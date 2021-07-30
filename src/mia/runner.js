import { Mia } from "./main/index.js"

const mia = new Mia();
async function run() {
    await mia.init();
    await mia.start();
}
run();