import { fork } from 'child_process'
let start = (async () => {
    return new Promise((res, rej) => {
        fork('./src/mia/runner.js').on("close", code => {
            if (code == 47) res();
            else rej()
        })
    }).catch(() => {
        process.exit(0);
    })
})
let runner = (async () => start().then(() => runner()));
runner();