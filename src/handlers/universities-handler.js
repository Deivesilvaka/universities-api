const UniversitiesService = require('../services/universities-service')

class UniversitiesHandler {

    /***
     * 
     * Adiciona um novo registro de universidade.
     *
     * @method post
     * 
     * @body 
     * @param {
     *  alpha_two_code: string,
     *  web_pages: [],
     *  name: string,
     *  country: string,
     *  domains: [],
     *  state_province: string
     * }
     * 
     * @return {Object}
     **/
    static async findOrCreate(req, res)  {
        const university = await UniversitiesService.findOrCreate(req.body)
        return res.json(university)
    }

    /***
     * 
     * Busca um registro de universidade pelo seu id.
     *
     * @method get
     * 
     * @query 
     * @param id identificador da universidade no banco
     * 
     * @return {Object}
     **/

    static async getUniversityById(req, res) {
        const university = await UniversitiesService.getUniversityById(req.query.id)
        return res.json(university)
    }
    
}

module.exports = UniversitiesHandler