const jwt = require('../helpers/jwt')
const status = require('http-status')

const AUTHORIZATION = (req, res, next) => {
  const token = req.headers?.authorization?.split(' ')[1]
  if (!token) return res.err(status.UNAUTHORIZED, 'Erişim reddedildi. Token yok.')

  try {
    const user = jwt.decodeJwt(token)
    req.user = { ...user, user }
    next()
  } catch {
    return res.err(status.UNAUTHORIZED, 'Geçersiz token.')
  }
}
const MANAGERAUTHORIZATION = (req, res, next) => {
  const token = req.headers?.authorization?.split(' ')[1]
  if (!token) return res.err(status.UNAUTHORIZED, 'Erişim reddedildi. Token yok.')

  try {
    const user = jwt.decodeJwt(token)
    if (user.role === 'manager') {
      req.user = { ...user, user }
      next()
    }
  } catch {
    return res.err(status.UNAUTHORIZED, 'Yönetici değilsin.')
  }
}

module.exports = { AUTHORIZATION, MANAGERAUTHORIZATION }
