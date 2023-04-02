const formatCarPlate = (value) => {
  if (value) {
    const newValue = value.replace(/(\d+)([A-Za-z]+)(\d+)/, '$1 $2 $3')
    return newValue
  }
  return
}

const formatDate = (value) => {
  const date = new Date(value)
  const format = date.toLocaleDateString('tr-TR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
  })

  return format
}

const formatDateNoHour = (value) => {
  const date = new Date(value)
  const format = date.toLocaleDateString('tr-TR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })

  return format
}

const whatType = (value) => {
  return value === 'bill'
    ? 'Fatura'
    : value === 'maintenance'
    ? 'Bakım'
    : value === 'repair'
    ? 'Onarım'
    : value === 'dues'
    ? 'Aidat'
    : 'Diğer'
}

const whatRole = (value) => {
  return value === 'landlord' ? 'Ev Sahibi' : value === 'tenant' ? 'Kiracı' : 'Diğer'
}

const formatAmount = (value) => {
  return Number(value.replace(',', '').replace(' TL', ''))
}

const formatNumber = (value) => {
  if (typeof value === 'number' || typeof value === 'string')
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return ''
}

const colorClasses = {
  theme: 'bg-theme',
  'theme-400': 'bg-theme-400',
  'theme-500': 'bg-theme-500 text-white',
  black: 'bg-sblack text-white',
  pink: 'bg-dpink text-sblack',
  purple: 'bg-dpurple text-sblack',
  red: 'bg-red-400 text-white',
  yellow: 'bg-dyellow text-sblack',
  lime: 'bg-[#e5f4c0] text-sblack',
  green: 'bg-sgreen text-white',
  dgreen: 'bg-dgreen text-sblack',
  blue: 'bg-sblue text-white',
  white: 'bg-white text-sblack',
  gray: 'bg-[#E0E0E0] text-sblack'
}

const spinnerClasses = {
  theme: 'text-theme',
  'theme-400': 'text-theme-400',
  'theme-500': 'text-theme-500',
  black: 'text-sblack',
  pink: 'text-dpink',
  purple: 'text-dpurple',
  red: 'text-red-400',
  yellow: 'text-dyellow',
  green: 'text-theme-500',
  blue: 'text-sblue',
  gray: 'text-[#E0E0E0]'
}

const formatPhoneNumber = (value) => {
  if (!typeof value === 'undefined') return ''
  return value.length >= 1
    ? value.map((p, i) => {
        const phoneNumber = p.toString().replace(/(\d{3})(\d{3})(\d{2})(\d{2})/, '$1 $2 $3 $4')
        return (
          <div className="text-sm" key={i}>
            0{phoneNumber}
          </div>
        )
      })
    : '-'
}

const numberToTurkishWords = (value) => {
  let num = Math.abs(value)

  if (num === 0) return 'sıfır'

  const ones = ['', 'bir', 'İki', 'üç', 'dört', 'beş', 'altı', 'yedi', 'sekiz', 'dokuz']
  const tens = ['', 'on', 'yirmi', 'otuz', 'kırk', 'elli', 'altmış', 'yetmiş', 'seksen', 'doksan']

  let words = ''

  // Milyonlar
  if (num >= 1000000) {
    words += `${numberToTurkishWords(Math.floor(num / 1000000))} milyon `
    num %= 1000000
  }

  // Binler
  if (num >= 1000) {
    words += `${numberToTurkishWords(Math.floor(num / 1000))} bin `
    num %= 1000
  }

  // Yüzler
  if (num >= 100) {
    words += `${ones[Math.floor(num / 100)]} yüz `
    num %= 100
  }

  // Onlar ve Birler
  if (num > 0) {
    if (num < 10) words += ones[num]
    else if (num < 20) {
      switch (num) {
        case 10:
          words += 'on'
          break
        case 11:
          words += 'on bir'
          break
        case 12:
          words += 'on İki'
          break
        case 13:
          words += 'on üç'
          break
        case 14:
          words += 'on dört'
          break
        case 15:
          words += 'on beş'
          break
        case 16:
          words += 'on altı'
          break
        case 17:
          words += 'on yedi'
          break
        case 18:
          words += 'on sekiz'
          break
        case 19:
          words += 'on dokuz'
          break
        default:
          words += ''
          break
      }
    } else {
      words += `${tens[Math.floor(num / 10)]} `
      if (num % 10 > 0) words += `${ones[num % 10]} `
    }
  }

  return words.trim()
}

export {
  formatCarPlate,
  formatDateNoHour,
  formatDate,
  whatType,
  formatAmount,
  colorClasses,
  whatRole,
  spinnerClasses,
  formatPhoneNumber,
  formatNumber,
  numberToTurkishWords
}
