const Joi = require('joi')

const newExpense = Joi.object({
	type: Joi.string().required(),
	amount: Joi.number().required(),
	description: Joi.string().required()
})

module.exports = { newExpense }
