
require('dotenv/config')
const express = require('express')
const routes = require('../routes')
const helmet = require('helmet')
const cors  = require('cors')
const Database = require('../database/database')
const security = require('../config/security')
const swaggerUI = require('swagger-ui-express')
const swaggerDocument = require('../config/swagger.json')
const packageJson = require('../../package.json')

class Backend {
    
    constructor() {

        this.port = null
        this.server = null

        Backend.setup()
        Backend.addSecurity()
        Backend.addRoutes()
        Backend.addDocumentation()
        Backend.startEvents()
        Database.start()
    }

    static setup() {
        this.port = process.env.PORT ?? process.env.port ?? '3333'
        swaggerDocument.info.version = packageJson.version
        this.server = express()
        this.server.use(express.json())
    }

    static addSecurity() {
        this.server.use(helmet())
        this.server.use(cors())
        this.server.use(security.security)
    }

    static addRoutes() {
        this.server.use(routes)
    }

    static startEvents() {
        this.server.on('SIGTERM', () => {
            this.server.on('close', () => process.exit())
        })
    }

    static addDocumentation() {
        this.server.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument))
    }

    static start() {
        this.server.listen(this.port, () => console.log(`Server running on port ${this.port} and process: ${process.pid}`))
    }
}

module.exports = Backend