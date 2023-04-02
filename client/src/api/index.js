import axios from 'axios'

// export const BASE_URL = 'http://localhost:5001/api/v1'
export const BASE_URL = 'https://apartmanyonetim.herokuapp.com/api/v1'

const API = axios.create({ baseURL: BASE_URL })

API.interceptors.request.use((req) => {
  const user = localStorage.getItem('user')

  if (user !== null) {
    const { token } = JSON.parse(user)
    if (token) {
      req.headers.Authorization = `Bearer ${token}`
    }
  }
  return req
})

const requests = {
  auth: {
    login: (body) => API.post('/auth/login', body, { withCredentials: true }),
    refreshToken: () => API.get('/auth/refreshToken', { withCredentials: true }),
    residentLogin: (body) => API.post('/auth/residentLogin', body),
    register: (body) => API.post('/auth/register', body),
    residentsRegister: (body) => API.post('/auth/residentsRegister', body),
    updateResidentsAuth: (body) => API.put('/auth/updateResidentsAuth', body),
    updateUser: (body) => API.put('/auth/updateUser', body),
    newResidentsUsernameControl: (body) => API.post('/auth/newResidentsUsernameControl', body)
  },
  apartment: {
    newApartment: (body) => API.post('/apartment', body),
    updateApartment: (body) => API.put('/apartment', body),
    getApartment: () => API.get('/apartment'),
    lastTransactions: () => API.get('/apartment/lastTransactions')
  },
  resident: {
    newResident: (body) => API.post('/resident', body),
    deleteResident: (residentId) => API.delete(`/resident/${residentId}`),
    listResidents: () => API.get('/resident/listResidents')
  },
  dues: {
    listDues: () => API.get('/dues/listDues'),
    paidDues: () => API.get('/dues/paidDues'),
    unPaidDues: () => API.get('/dues/unPaidDues'),
    payDues: (id) => API.post(`/dues/paydues/${id}`)
  },
  expense: {
    newExpense: (body) => API.post('/expense/newExpense', body),
    listExpenses: () => API.get('/expense/listExpenses'),
    deleteExpense: (id) => API.delete(`/expense/deleteExpense/${id}`)
  },
  debt: {
    newDebt: (body) => API.post('/debt/newDebt', body),
    listDebts: () => API.get('/debt/listDebts'),
    deleteDebt: (id) => API.delete(`/debt/deleteDebt/${id}`)
  }
}

export default requests
