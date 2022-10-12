const UniversitiesService = require('../services/universities-service')

class UniversitiesHandler {

    /***
     * 
     * Adiciona um novo registro de universidade.
     *
     * @method post
     * 
     * @body 
     * @property {
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

    /***
     * 
     * Busca um registro de universidade pelo seu id.
     *
     * @method get
     * 
     * @query 
     * @param country pais cujo universidade esta situada
     * @param page numero da pagina de contagem
     * 
     * @return {Object}
     **/

    static async getUniversities(req, res) {
        const { country = null, page = 0 } = req.query
        const universities = await UniversitiesService.getAllUniversities(country, page)
        return res.json(universities)
    }

    /***
     * 
     * Deleta um registro de universidade pelo seu id.
     *
     * @method post
     * 
     * @body 
     * @property { _id: string } identificador da universidade no banco
     * 
     * @return {Object}
     **/

    static async deleteUniversity(req, res) {
        const { _id } = req.body
        const university = await UniversitiesService.deleteById(_id)
        return res.json(university)
    }

    /***
     * 
     * atualiza um registro de universidade pelo seu id.
     *
     * @method post
     * 
     * @query 
     * @param _id identificador da universidade no banco
     * 
     * @body
     * @property {
     *  web_pages: [],
     *  name: string,
     *  domains: []
     * }
     * 
     * @return {Object}
     **/

    static async updateUniversity(req, res) {
        const { _id = null } = req.query
        const university = await UniversitiesService.updateUniversity(_id, req.body)
        return res.json(university)
    }
    
}

module.exports = UniversitiesHandler