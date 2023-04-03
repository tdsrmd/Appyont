import { createContext, useContext, useEffect, useState } from 'react'
import requests from 'api'
import useSWR from 'swr'

const Context = createContext()

export const DuesContext = ({ children }) => {
  const [paidDues, setPaidDues] = useState()
  const [unPaidDues, setUnPaidDues] = useState()

  const { data: listPaidDues } = useSWR(
    'listPaidDues',
    async () => await requests.dues.paidDues().then((res) => res.data)
  )
  const { data: listUnPaidDues } = useSWR(
    'listUnPaidDues',
    async () => await requests.dues.unPaidDues().then((res) => res.data)
  )

  useEffect(() => {
    if (listPaidDues) setPaidDues(listPaidDues)
    if (listUnPaidDues) setUnPaidDues(listUnPaidDues)
  }, [listPaidDues, listUnPaidDues])

  const data = {
    paidDues,
    unPaidDues
  }

  return <Context.Provider value={data}>{children}</Context.Provider>
}

export const useDues = () => useContext(Context)
