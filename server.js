const Backend = require("./src")
const os = require('os')
const cluster = require('cluster')

function primaryProcess() {
    const processesCount = os.cpus().length * 2

    for(let index = 0; index < processesCount; index++) {
        cluster.fork()
    }

    cluster.on('exit', (worker, code, signal) => {
         if(code !== 0 && !worker.exitedAfterDisconnect) {
            console.info(`Worker ${worker.process.pid} is dead! Scheduling another one...`)
            cluster.fork()
         }
    })
}

function workerProcess() {
    Backend.start()
}

cluster.isPrimary ? primaryProcess() : workerProcess()