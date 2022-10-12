const {  Router } = require('express')
const UniversitiesHandler = require('./handlers/universities-handler')


const router = Router()

// ------------------------ University routes ------------------------//

// Adicionar mais um registro de universidade.
router.post('/university/new', UniversitiesHandler.findOrCreate)

// Busca registo de uma universidade pelo seu id
router.get('/university/byId', UniversitiesHandler.getUniversityById)

module.exports = router