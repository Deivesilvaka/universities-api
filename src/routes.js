const {  Router } = require('express')
const UniversitiesHandler = require('./handlers/universities-handler')


const router = Router()

// ------------------------ University routes ------------------------//


// Busca registo de uma universidade pelo seu id.
router.get('/university/byId', UniversitiesHandler.getUniversityById)

// Busca todos os registo de universidades.
router.get('/universities', UniversitiesHandler.getUniversities)

// Adicionar mais um registro de universidade.
router.post('/university/new', UniversitiesHandler.findOrCreate)

// Deleta registro de universidade.
router.post('/university/delete', UniversitiesHandler.deleteUniversity)

// Atualiza registro de alguma universidade.
router.post('/university/update', UniversitiesHandler.updateUniversity)

module.exports = router