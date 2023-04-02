const express = require('express')
const router = express.Router()
const auth = require('./authRoute')
const apartment = require('./apartmentRoute')
const resident = require('./residentRoute')
const dues = require('./duesRoute')
const expense = require('./expenseRoute')
const debt = require('./debtRoute')

router.use('/auth', auth)
router.use('/apartment', apartment)
router.use('/resident', resident)
router.use('/dues', dues)
router.use('/expense', expense)
router.use('/debt', debt)

module.exports = router
