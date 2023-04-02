const getNowMonth = () => {
  const month = new Date().getMonth()
  let monthName
  if (month === 0) {
    monthName = 'Ocak'
  } else if (month === 1) {
    monthName = 'Şubat'
  } else if (month === 2) {
    monthName = 'Mart'
  } else if (month === 3) {
    monthName = 'Nisan'
  } else if (month === 4) {
    monthName = 'Mayıs'
  } else if (month === 5) {
    monthName = 'Haziran'
  } else if (month === 6) {
    monthName = 'Temmuz'
  } else if (month === 7) {
    monthName = 'Ağustos'
  } else if (month === 8) {
    monthName = 'Eylül'
  } else if (month === 9) {
    monthName = 'Ekim'
  } else if (month === 10) {
    monthName = 'Kasım'
  } else if (month === 11) {
    monthName = 'Aralık'
  }
  return monthName
}

const getNowYearMonth = () => {
  const now = new Date()
  const mounth = now.getMonth() + 1

  const date = `${now.getFullYear()}-${mounth < 10 ? '0' + mounth : mounth}`
  return date
}

const nowMonthControl = (month) => {
  const date = getNowYearMonth()
  return {
    gte: new Date(`${month ? month : date}-01T00:00:00.000Z`),
    lte: new Date(`${month ? month : date}-31T23:59:59.999Z`)
  }
}

module.exports = { getNowMonth, getNowYearMonth, nowMonthControl }
