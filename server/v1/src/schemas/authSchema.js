const Joi = require('joi')
Joi.ObjectId = require('joi-objectid')(Joi)

const login = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required()
})

const residentLogin = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required()
})

const register = Joi.object({
  firstName: Joi.string().min(3).max(50).required(),
  lastName: Joi.string().min(3).max(30).required(),
  username: Joi.string().max(50).required(),
  password: Joi.string().min(6).max(16).required(),
  passwordAgain: Joi.any().valid(Joi.ref('password'))
})

const residentsRegister = Joi.object({
  username: Joi.string().max(50).required(),
  password: Joi.string().min(6).max(16).required(),
  passwordAgain: Joi.any().valid(Joi.ref('password')),
  apartmentId: Joi.ObjectId().required()
})

const newResidentsUsernameControl = Joi.object({
  username: Joi.string().max(50).required(),
  password: Joi.string().min(6).max(16).required(),
  passwordAgain: Joi.any().valid(Joi.ref('password'))
})

const updateResidentsAuth = Joi.object({
  id: Joi.ObjectId().required(),
  username: Joi.string().max(50),
  password: Joi.string().min(6).max(16),
  passwordAgain: Joi.any().valid(Joi.ref('password'))
})

const updateUser = Joi.object({
  firstName: Joi.string().min(3).max(50),
  lastName: Joi.string().min(3).max(30),
  username: Joi.string().max(50),
  password: Joi.string().min(6).max(16),
  passwordAgain: Joi.any()
    .valid(Joi.ref('password'))
    .when('password', {
      is: Joi.exist(),
      then: Joi.string().valid(Joi.ref('password')).required()
    })
})

module.exports = {
  login,
  residentLogin,
  register,
  residentsRegister,
  updateResidentsAuth,
  newResidentsUsernameControl,
  updateUser
}
