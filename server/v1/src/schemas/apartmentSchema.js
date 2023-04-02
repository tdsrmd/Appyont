const Joi = require('joi')
Joi.ObjectId = require('joi-objectid')(Joi)

const newApartment = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  till: Joi.number(),
  monthlyDuesAmount: Joi.number().max(50000),
  managerId: Joi.ObjectId().required()
})

const updateApartment = Joi.object({
  name: Joi.string().min(3).max(50),
  monthlyDuesAmount: Joi.number().max(50000)
})

module.exports = {
  newApartment,
  updateApartment
}
