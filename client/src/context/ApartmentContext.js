import requests from 'api'
import Spinner from 'components/Spinner'
import { createContext, useContext, useState, useEffect } from 'react'
import useSWR from 'swr'

const Context = createContext()

export const ApartmentContext = ({ children }) => {
  const [apartment, setApartment] = useState()
  const [residents, setResidents] = useState()
  const [expenses, setExpenses] = useState()
  const [debts, setDebts] = useState()
  const [lastTransactions, setLastTransactions] = useState()

  const { data: apartmentData, error } = useSWR(
    'getApartment',
    async () => await requests.apartment.getApartment().then((res) => res.data)
  )
  const { data: residentData } = useSWR(
    'listResidents',
    async () => await requests.resident.listResidents().then((res) => res.data)
  )
  const { data: expensesData } = useSWR(
    'listExpenses',
    async () => await requests.expense.listExpenses().then((res) => res.data)
  )
  const { data: lastTransactionsData } = useSWR(
    'lastTransactions',
    async () => await requests.apartment.lastTransactions().then((res) => res.data)
  )
  const { data: debtsData } = useSWR('listDebts', async () => await requests.debt.listDebts().then((res) => res.data))

  useEffect(() => {
    if (apartmentData) setApartment(apartmentData)
    if (residentData) setResidents(residentData)
    if (expensesData) setExpenses(expensesData)
    if (debtsData) setDebts(debtsData)
    if (lastTransactionsData) setLastTransactions(lastTransactionsData)
  }, [apartmentData, debtsData, residentData, expensesData, lastTransactionsData])

  useEffect(() => {
    const status = error?.response?.status
    if (status === 404 || status === 401 || status === 500) {
      localStorage.clear()
      window.location.reload()
    }
  }, [error])

  if (!apartmentData || !residentData || !expensesData || !lastTransactionsData || !debtsData)
    return (
      <div className="absolute-center col-center gap-y-3">
        <span className="font-light">Yükleniyor</span>
        <Spinner className="w-5 h-5" />
      </div>
    )

  const data = { apartment, residents, setResidents, expenses, lastTransactions, debts }
  return <Context.Provider value={data}>{children}</Context.Provider>
}

export const useApartment = () => useContext(Context)
