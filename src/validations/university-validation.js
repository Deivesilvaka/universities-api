
const yup = require('../config/yup')

class UniversityValidation {
    static async create(university) {
        const schema = yup.yup.object({
            alpha_two_code: yup.yup.string().min(2),
            name: yup.yup.string().min(1).required(),
            country: yup.yup.string().min(1).required(),
            domains: yup.yup.array().of(yup.yup.string()).min(1).required(),
            state_province: yup.yup.string(),
            web_pages: yup.yup.array().of(yup.yup.string()).min(1).required()
        })

        return await yup.validateSchema(schema, university)
    }
}

module.exports = UniversityValidation