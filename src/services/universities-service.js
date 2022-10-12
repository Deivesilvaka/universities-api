const universities = require("../database/models/universities-model")
const UniversityValidation = require('../validations/university-validation')
const { isObjectIdOrHexString } = require('mongoose')

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

    static async getAllUniversities(country, page = 0) {

        let allUniversities = null

        if(country && country.toUpperCase() === 'BRASIL') {
            country = 'Brazil'
        }
        
        if(!country) {
            allUniversities = await universities.find().lean()
        } else {
            allUniversities = await universities.find({ country }).lean()
        }

        if(allUniversities.length === 0) {
            return {
                status: 400,
                message: "Nenhuma universidade encontrada"
            }
        }

        if(page < 0) {
            page = 0
        }

        const limit = 20
        const index = (page * limit)

        if(index >= allUniversities.length) {
            return allUniversities.slice(0, limit)
        }

        return allUniversities.slice(index, index+limit)

    }

    static async deleteById(_id) {
        if(!isObjectIdOrHexString(_id)) {
            return {
                status: 500,
                message: 'Identificador informado não é válido'
            }
        }

        try {
            return await universities.remove({ _id })
        }catch(err) {
            return {
                status: 500,
                message: "Falha ao deletar registro"
            }
        }
    }

    static async updateUniversity(_id, university) {
        if(!isObjectIdOrHexString(_id)) {
            return {
                status: 500,
                message: 'Identificador informado não é válido'
            }
        }

        const validation = await UniversityValidation.update(university)
        return await universities.updateOne({ _id }, { $set: validation })
    }
}

module.exports = UniversitiesService