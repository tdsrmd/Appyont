const Joi = require('joi')
Joi.ObjectId = require('joi-objectid')(Joi)

const newResident = Joi.object({
  flatNumber: Joi.number().min(0).max(10000).required(),
  firstName: Joi.string().min(3).max(50).required(),
  lastName: Joi.string().min(3).max(30).required(),
  phone: Joi.array(),
  carPlate: Joi.string().allow(null),
  role: Joi.string(),
  apartmentId: Joi.ObjectId()
})

const payDues = Joi.object({
  residentId: Joi.ObjectId().required()
})

module.exports = {
  newResident,
  payDues
}
