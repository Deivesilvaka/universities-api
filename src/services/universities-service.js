const universities = require("../database/models/universities-model")
const UniversityValidation = require('../validations/university-validation')

class UniversitiesService {
    static async findOrCreate(university) {

        const validation = await UniversityValidation.create(university)

        if(validation?.status) return validation

        const universityData = await universities.find({ name: university.name }).lean()

        if(universityData.length !== 0) {
            return universityData
        }

        return await universities.create(university)
    }

    static async getUniversityById(_id) {
        try {
            const university = await universities.find({ _id }).lean()

            if(university.length === 0) {
                return {
                    status: 400,
                    message: 'Nenhum registro encontrado'
                }
            }

            return university
        }catch(e){
            return {
                status: 400,
                message: 'Erro ao buscar registro'
            }
        } 
    }
}

module.exports = UniversitiesService