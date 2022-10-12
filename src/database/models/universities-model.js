const Database = require("../database")
const UniversitiesSchema = require('../schemas/universities-schema')

const connection = Database.getOrCriateConnection()

const University = connection.model('university', UniversitiesSchema, 'universities')

module.exports = University