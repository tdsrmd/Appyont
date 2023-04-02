const jwt = require('jsonwebtoken')

const generateJwt = (data, expire) => {
  return jwt.sign(data, process.env.ACCESS_TOKEN_SECRET_KEY, {
    expiresIn: expire ? expire : process.env.TOKEN_EXPIRATION
  })
}
const generateRefreshJwt = (data) => {
  return jwt.sign(data, process.env.REFRESHH_TOKEN_SECRET_KEY)
}

const decodeJwt = (token) => {
  return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY)
}

module.exports = {
  generateJwt,
  generateRefreshJwt,
  decodeJwt
}
