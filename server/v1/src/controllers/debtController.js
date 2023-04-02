const status = require('http-status')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const newDebt = async (req, res) => {
  try {
    const { amount, description, date, type, residentId } = req.body
    const { apartmentId } = req.user

    if (residentId) {
      const newDebt = await prisma.debt.create({
        data: {
          amount: Number(amount),
          description,
          date,
          type,
          apartmentId,
          residentId
        }
      })
      return res.suc(status.CREATED, 'Başarılı bir şekilde kayıt edildi.')
    } else {
      const residents = await prisma.apartment
        .findUnique({
          where: { id: apartmentId }
        })
        .residents()

      const debtArray = residents.map((resident) => ({
        amount: Number(amount),
        description,
        date,
        type,
        apartmentId,
        residentId: resident.id
      }))

      const newDebt = await prisma.debt.createMany({
        data: debtArray
      })
      return res.suc(status.CREATED, 'Başarılı bir şekilde kayıt edildi.')
    }
  } catch (err) {
    console.log(err)
    return res.err(status.INTERNAL_SERVER_ERROR, 'Bir hata oluştu.')
  }
}

const listDebts = async (req, res) => {
  try {
    const { apartmentId } = req.user

    const debts = await prisma.debt.findMany({
      where: { apartmentId },
      select: {
        id: true,
        amount: true,
        description: true,
        type: true,
        date: true,
        createdAt: true,
        resident: {
          select: {
            flatNumber: true,
            firstName: true,
            lastName: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    const data = debts.map((debt) => {
      return {
        id: debt.id,
        flatNumber: debt.resident.flatNumber,
        nameSurname: `${debt.resident.firstName} ${debt.resident.lastName}`,
        amount: debt.amount,
        description: debt.description,
        type: debt.type,
        date: debt.date,
        createdAt: debt.createdAt
      }
    })

    res.suc(status.OK, data)
  } catch (err) {
    console.log(err)
    return res.err(status.INTERNAL_SERVER_ERROR, 'Bir hata oluştu.')
  }
}

const deleteDebt = async (req, res) => {
  try {
    const { id } = req.params
    const deleteDebt = await prisma.debt.delete({ where: { id } })

    return res.suc(status.NO_CONTENT, 'Başarıyla silindi.')
  } catch (err) {
    console.log(err)
    return res.err(status.INTERNAL_SERVER_ERROR, 'Bir hata oluştu.')
  }
}

module.exports = {
  newDebt,
  listDebts,
  deleteDebt
}
