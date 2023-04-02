const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')
const validate = require('../middlewares/validate')
const schema = require('../schemas/authSchema')
const { MANAGERAUTHORIZATION } = require('../middlewares/access')

router.post('/login', validate(schema.login), authController.login)
router.get('/refreshToken', authController.refreshToken)
router.post('/residentLogin', validate(schema.residentLogin), authController.residentLogin)
router.post('/register', validate(schema.register), authController.register)
router.post(
  '/newResidentsUsernameControl',
  validate(schema.newResidentsUsernameControl),
  authController.newResidentsUsernameControl
)
router.post('/residentsRegister', validate(schema.residentsRegister), authController.residentsRegister)
router.put(
  '/updateResidentsAuth',
  MANAGERAUTHORIZATION,
  validate(schema.updateResidentsAuth),
  authController.updateResidentsAuth
)
router.put('/updateUser', MANAGERAUTHORIZATION, validate(schema.updateUser), authController.updateUser)

module.exports = router
