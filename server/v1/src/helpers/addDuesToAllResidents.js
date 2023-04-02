const cron = require('node-cron')
const { PrismaClient } = require('@prisma/client')
const { nowMonthControl } = require('./date')
const prisma = new PrismaClient()

const addDuesToAllResidents = async () => {
  try {
    const residents = await prisma.resident.findMany({
      select: {
        id: true,
        apartment: {
          select: {
            id: true,
            monthlyDuesAmount: true
          }
        }
      }
    })

    const existingDues = await prisma.dues.findFirst({
      where: {
        isPaid: false,
        createdAt: nowMonthControl()
      }
    })

    if (existingDues) return console.error('Bu ay zaten aidat eklenmiş.')

    const data = residents.map((resident) => ({
      residentId: resident.id,
      apartmentId: resident.apartment.id,
      amount: resident.apartment.monthlyDuesAmount,
      isPaid: false
    }))

    const addDues = await prisma.dues.createMany({
      data
    })

    console.log('Tüm residentslere aidat eklendi.')
  } catch (err) {
    console.error('Bir hata oluştu.', err)
  }
}

const addDebtToResident = async () => {
  try {
    const dues = await prisma.dues.findMany({
      where: {
        isPaid: false,
        createdAt: nowMonthControl()
      },
      select: {
        resident: true,
        apartment: true
      }
    })

    const data = dues.map((item) => ({
      amount: item.apartment.monthlyDuesAmount,
      description: 'Aidat ödenmedi.',
      type: 'dues',
      residentId: item.resident.id,
      apartmentId: item.apartment.id
    }))

    // const addDebtToResident = await prisma.debt.createMany({ data });
    // console.log("Tüm residents'lere borç eklendi.");
  } catch (err) {
    console.log(err)
    console.error('Bir hata oluştu.')
  }
}

const duesCronJob = cron.schedule('*/23232 * * * * *', async () => {
  addDebtToResident()
})

module.exports = { duesCronJob }
