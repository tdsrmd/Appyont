const { PrismaClient } = require('@prisma/client')
const status = require('http-status')
const prisma = new PrismaClient()

const newExpense = async (req, res) => {
  try {
    const { type, amount, description } = req.body
    const { apartmentId } = req.user

    const existingApartment = await prisma.apartment.findUnique({ where: { id: apartmentId } })
    if (!existingApartment) res.err(status.NOT_FOUND, 'Apartman bulunamadı.')

    const newExpense = await prisma.expense.create({
      data: {
        type,
        amount,
        description,
        apartmentId
      }
    })

    const tillUpdate = await prisma.apartment.update({
      where: { id: apartmentId },
      data: { till: { decrement: amount } }
    })

    return res.suc(status.CREATED, 'Kayıt başarılı.')
  } catch (err) {
    console.log(err)
    return res.err(status.INTERNAL_SERVER_ERROR, 'Bir hata oluştu.')
  }
}

const listExpenses = async (req, res) => {
  try {
    const { apartmentId } = req.user
    const expenses = await prisma.apartment.findUnique({ where: { id: apartmentId } }).expenses({
      select: {
        id: true,
        amount: true,
        description: true,
        type: true,
        createdAt: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return res.suc(status.OK, expenses)
  } catch (err) {
    console.log(err)
    return res.err(status.INTERNAL_SERVER_ERROR, 'Bir hata oluştu.')
  }
}

const deleteExpense = async (req, res) => {
  try {
    const { id } = req.params
    const { apartmentId } = req.user

    const existingExpense = await prisma.expense.findUnique({ where: { id: id } })
    if (!existingExpense) return res.err(status.NOT_FOUND, 'Expense bulunamadı.')

    const deleteExpense = await prisma.expense.delete({ where: { id: id } })

    const tillUpdate = await prisma.apartment.update({
      where: { id: apartmentId },
      data: { till: { increment: deleteExpense.amount } }
    })

    return res.suc(status.NO_CONTENT, 'Expense başarıyla silindi.')
  } catch (err) {
    console.log(err)
    return res.err(status.INTERNAL_SERVER_ERROR, 'Bir hata oluştu.')
  }
}

module.exports = { newExpense, listExpenses, deleteExpense }
