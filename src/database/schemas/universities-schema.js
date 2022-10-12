
const mongoose = require("mongoose")

const UniversitiesSchema = new mongoose.Schema({
    alpha_two_code: {
        type: String,
        default: null
    },
    web_pages: [],
    name: {
        type: String,
        default: null
    },
    country: {
        type: String,
        default: null
    },
    domains: [],
    state_province: {
        type: String,
        default: null
    }
})

module.exports = UniversitiesSchema