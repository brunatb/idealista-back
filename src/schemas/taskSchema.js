const Joi = require('joi');

const testSchema = Joi.object({
    name: Joi.string().required(),
})

const testUpdateSchema = Joi.object({
    name: Joi.string(),
    isChecked: Joi.boolean(),
})

module.exports = {
    testSchema,
    testUpdateSchema
}