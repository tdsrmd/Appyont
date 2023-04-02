// const Joi = require("joi");
const status = require('http-status')

const validateMiddleware = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body)

    if (error) {
      const errorMessage = error.details.map((d) => d.message).join(', ')
      return res.err(status.BAD_REQUEST, errorMessage)
    }

    next()
  }
}

module.exports = validateMiddleware
