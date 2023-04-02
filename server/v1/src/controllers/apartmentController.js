const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const status = require('http-status')

const newApartment = async (req, res) => {
  try {
    const { name, till, monthlyDuesAmount, managerId } = req.body

    const manager = await prisma.user.findFirst({ where: { id: managerId } })
    if (!manager) return res.err(status.NOT_FOUND, 'Yönetici bulunamadı.')

    const isManager = await prisma.user.findFirst({ where: { id: managerId } }).apartment()
    if (isManager) return res.err(status.CONFLICT, 'Bu kullanıcı zaten bir apartmanın yöneticisi.')

    const newApartment = await prisma.apartment.create({
      data: {
        name,
        till,
        monthlyDuesAmount,
        manager: { connect: { id: managerId } }
      }
    })

    res.suc(status.CREATED, newApartment)
  } catch (error) {
    console.log(error)
    return res.err(status.INTERNAL_SERVER_ERROR, 'Bir hata oluştu.')
  }
}

const getApartment = async (req, res) => {
  try {
    const { apartmentId } = req.user

    const apartment = await prisma.apartment.findUnique({
      where: { id: apartmentId },
      select: {
        id: true,
        monthlyDuesAmount: true,
        name: true,
        till: true,
        manager: {
          select: {
            username: true,
            firstName: true,
            lastName: true
          }
        },
        residentsLogin: {
          select: {
            id: true,
            username: true
          }
        }
      }
    })
    if (!apartment) return res.err(status.NOT_FOUND, 'Apartman bulunamadı.')

    return res.suc(status.OK, apartment)
  } catch (error) {
    console.log(error)
    return res.err(status.INTERNAL_SERVER_ERROR, 'Bir hata oluştu.')
  }
}

const updateApartment = async (req, res) => {
  try {
    const { apartmentId } = req.user
    const { name, monthlyDuesAmount } = req.body

    const updateApartment = await prisma.apartment.update({
      where: { id: apartmentId },
      data: {
        monthlyDuesAmount: Number(monthlyDuesAmount),
        name
      }
    })

    res.suc(status.OK, 'Apartman bilgileri güncellendi.')
  } catch (error) {
    console.log(error)
    return res.err(status.INTERNAL_SERVER_ERROR, 'Bir hata oluştu.')
  }
}

const lastTransactions = async (req, res) => {
  try {
    const { apartmentId } = req.user

    const expenses = await prisma.expense.findMany({
      where: { apartmentId },
      select: {
        id: true,
        amount: true,
        createdAt: true,
        type: true,
        description: true
      },
      take: -5
    })

    const incomes = await prisma.dues.findMany({
      where: { apartmentId, isPaid: true },
      select: {
        id: true,
        amount: true,
        createdAt: true,
        resident: {
          select: {
            firstName: true,
            lastName: true,
            flatNumber: true
          }
        }
      },
      take: -5
    })

    const data = expenses.concat(incomes)
    data.sort((a, b) => b.createdAt - a.createdAt)

    return res.suc(status.OK, data)
  } catch (error) {
    console.log(error)
    return res.err(status.INTERNAL_SERVER_ERROR, 'Bir hata oluştu.')
  }
}

module.exports = {
  newApartment,
  getApartment,
  lastTransactions,
  updateApartment
}
