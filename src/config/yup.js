const yup = require('yup')

yup.setLocale({
    number: {
        min: 'Campo ${path} inválido, o valor mínimo é ${min}.'
    },
    string: {
        matches: 'Campo ${path} inválido.',
        email: 'Email inválido!',
        min: 'Campo ${path} deve ter no mínimo ${min} caracteres.'
    },
    array: {
        min: 'Array ${path} não pode ser vazio.'
    },
    mixed: {
        required: '${path} é um campo obrigatório.',
        oneOf: '${path} deve ser um dos seguintes valores: ${values}.',
        notType: '${path} deve ser um valor do tipo ${type}.',
        default: 'Campo ${path} inválido.'
    }
})

module.exports = {yup, validateSchema: async (schema, value, message = '') => {
    try {
        return await schema.validate(value, { abortEarly: true, stripUnknown: true })
    } catch (err) {
        const error = {
            status: 400,
            message: err.errors[0] || message
        }
        
        return error
    }
}}