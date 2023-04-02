const Joi = require('joi')
Joi.ObjectId = require('joi-objectid')(Joi)

const newDebt = Joi.object({
  amount: Joi.number().max(1000000).required(),
  description: Joi.string().min(3).max(50).required(),
  date: Joi.date().required(),
  type: Joi.string(),
  residentId: Joi.ObjectId()
})

module.exports = {
  newDebt
}
