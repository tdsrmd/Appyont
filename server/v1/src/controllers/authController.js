const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const bcrypt = require('bcrypt')
const status = require('http-status')
const { generateJwt, generateRefreshJwt, decodeJwt } = require('../helpers/jwt')

const login = async (req, res) => {
  try {
    const { username, password } = req.body

    const user = await prisma.user.findUnique({
      where: { username },
      include: {
        apartment: true
      }
    })
    if (!user) return res.err(status.NOT_FOUND, 'Böyle bir kullanıcı adı bulunamadı.')

    const passwordMatch = await bcrypt.compare(password, user.password)
    if (!passwordMatch) return res.err(status.BAD_REQUEST, 'Kullanıcı adı ya da parola hatalı.')

    const token = generateJwt({ id: user.id, apartmentId: user.apartment.id, role: 'manager' })
    const refreshToken = generateRefreshJwt({ id: user.id, apartmentId: user.apartment.id, role: 'manager' })

    const data = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      apartmentId: user.apartment.id,
      token: token
    }

    res.cookie('refreshToken', refreshToken, {
      sameSite: 'strict',
      httpOnly: true
    })

    return res.suc(status.OK, { user: data })
  } catch (err) {
    console.log(err)
    return res.err(status.INTERNAL_SERVER_ERROR, 'Bir hata oluştu.')
  }
}

const refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken
    if (!refreshToken) return res.err(status.NOT_FOUND, 'Token bulunamadı.')
    const decode = decodeJwt(refreshToken)
    if (!decode) return res.err(status.UNAUTHORIZED, 'Geçersiz token.')

    const resident = await prisma.user.findUnique({ where: { id: decode.id } })
    if (!resident) return res.err(status.UNAUTHORIZED, 'Kullanıcı bulunamadı.')

    const token = generateJwt(decode)
    return res.suc(status.OK, token)
  } catch (error) {
    console.log(error)
  }
}

const residentLogin = async (req, res) => {
  try {
    const { username, password } = req.body

    const user = await prisma.residentsLogin.findUnique({
      where: { username },
      include: {
        apartment: true
      }
    })
    if (!user) return res.err(status.NOT_FOUND, 'Böyle bir kullanıcı adı bulunamadı.')

    const passwordMatch = await bcrypt.compare(password, user.password)
    if (!passwordMatch) return res.err(status.BAD_REQUEST, 'Kullanıcı adı ya da parola hatalı.')

    const token = generateJwt({ id: user.id, apartmentId: user.apartment.id, role: 'resident' })

    const data = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      apartmentId: user.apartment.id,
      token: token
    }

    return res.suc(status.OK, { user: data })
  } catch (err) {
    console.log(err)
    return res.err(status.INTERNAL_SERVER_ERROR, 'Bir hata oluştu.')
  }
}

const register = async (req, res) => {
  try {
    const { firstName, lastName, password } = req.body
    let username = req.body.username
    username = username.replace(/\s/g, '')
    const existingUser = await prisma.user.findUnique({ where: { username } })
    if (existingUser) return res.err(status.CONFLICT, 'Kullanıcı adı zaten kayıtlı.')

    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await prisma.user.create({
      data: { firstName, lastName, username, password: hashedPassword }
    })

    const token = generateJwt({ id: user.id, role: 'manager' })

    const data = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      token: token
    }

    return res.suc(status.CREATED, { user: data })
  } catch (err) {
    console.log(err)
    return res.err(status.INTERNAL_SERVER_ERROR, 'Bir hata oluştu.')
  }
}

const residentsRegister = async (req, res) => {
  try {
    const { password, apartmentId } = req.body
    let username = req.body.username
    username = username.replace(/\s/g, '')

    const existingUser = await prisma.residentsLogin.findUnique({ where: { username } })
    if (existingUser) return res.err(status.CONFLICT, 'Kullanıcı adı zaten kayıtlı.')

    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await prisma.residentsLogin.create({
      data: { username, password: hashedPassword, apartmentId }
    })

    return res.suc(status.CREATED, 'Kayıt başarılı.')
  } catch (err) {
    console.log(err)
    return res.err(status.INTERNAL_SERVER_ERROR, 'Bir hata oluştu.')
  }
}

const updateUser = async (req, res) => {
  try {
    const { username, password, firstName, lastName } = req.body
    const { id } = req.user

    const hashedPassword = password && (await bcrypt.hash(password, 10))

    const updateResidentsAuth = await prisma.user.update({
      where: { id },
      data: {
        username,
        password: hashedPassword,
        firstName,
        lastName
      }
    })

    return res.suc(status.OK, 'Başarılı bir şekilde güncellendi.')
  } catch (err) {
    console.log(err)
    return res.err(status.INTERNAL_SERVER_ERROR, 'Bir hata oluştu.')
  }
}

const updateResidentsAuth = async (req, res) => {
  try {
    const { id, username, password } = req.body

    const hashedPassword = await bcrypt.hash(password, 10)

    const updateResidentsAuth = await prisma.residentsLogin.update({
      where: { id },
      data: {
        username,
        password: hashedPassword
      }
    })

    return res.suc(status.OK, 'Başarılı bir şekilde güncellendi.')
  } catch (err) {
    console.log(err)
    return res.err(status.INTERNAL_SERVER_ERROR, 'Bir hata oluştu.')
  }
}

const newResidentsUsernameControl = async (req, res) => {
  try {
    let username = req.body.username
    username = username.replace(/\s/g, '')

    const existingUser = await prisma.residentsLogin.findUnique({ where: { username } })
    if (existingUser) return res.err(status.CONFLICT, 'Kullanıcı adı zaten kayıtlı.')

    return res.suc(status.OK, 'Kullanıcı adı kayıtlı değil.')
  } catch (err) {
    console.log(err)
    return res.err(status.INTERNAL_SERVER_ERROR, 'Bir hata oluştu.')
  }
}

module.exports = {
  login,
  register,
  updateUser,
  refreshToken,
  residentLogin,
  residentsRegister,
  updateResidentsAuth,
  newResidentsUsernameControl
}
