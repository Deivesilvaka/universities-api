const mongoose = require("mongoose")

const { MONGODB_URI = '' } = process.env
let connection = null
class Database {
    static getOrCriateConnection() {
        
        if(!connection) {
            connection = Database.createConnection()
        }
        
        return connection
    }

    static createConnection() {
        
        const options = {
            serverSelectionTimeoutMS: 15000,
            socketTimeoutMS: 20000,
            connectTimeoutMS: 15000,
            maxPoolSize: 1,
            minPoolSize: 1,
            family: 4,
            useUnifiedTopology: true,
            useNewUrlParser: true
        }

        return mongoose.createConnection(MONGODB_URI, options)
    }

    static async start() {
        Database.getOrCriateConnection()
        await Database.startEvents()
    }

    static async startEvents() {
        connection.on('connected', () => console.info("Database connected!"))
        connection.on('disconnected', () => {
            console.info("Database disconnected!")
            connection = Database.createConnection()
        })
        connection.on('reconnected', () => console.info(`Database reconnected!`))
    }
}

module.exports = Database