
const { countries } = require('../config/countries.json')
const Universities = require('../database/models/universities-model')
const axios = require('axios')
const UniversitiesService = require('../services/universities-service')

const API_UNIVERSITIES_INSTANCE = axios.create({
    timeout: 20000,
    baseURL: process.env.API_UNIVERSITIES
})

class StartupService {
    static async start() {
        const universities = await Universities.find().limit(10)

        if(universities.length <  10) {
            await StartupService.saveRecords()
        }
    }

    static async saveRecords() {
        for(let country = 0; country < countries.length; country++) {
            const universities = await StartupService.getUniversitiesOfTheCountry(countries[country])
            universities.map(async university => {
                const record = await UniversitiesService.findOrCreate(university)
                return record
            })
        }
    }

    static async getUniversitiesOfTheCountry(country) {
        try {
            const universitiesOfTheCountry = await API_UNIVERSITIES_INSTANCE.get(`/search?country=${country}`)
            return universitiesOfTheCountry.data
        }catch(err) {
            return false
        }
    }
}

module.exports = StartupService