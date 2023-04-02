import { createContext, useContext, useEffect, useState } from 'react'
import requests from 'api'
import useSWR from 'swr'

const Context = createContext()

export const DuesContext = ({ children }) => {
  const [dues, setDues] = useState()
  const [paidDues, setPaidDues] = useState()
  const [unPaidDues, setUnPaidDues] = useState()

  const { data: listDues } = useSWR('listDues', async () => await requests.dues.listDues().then((res) => res.data))
  const { data: listPaidDues } = useSWR(
    'listPaidDues',
    async () => await requests.dues.paidDues().then((res) => res.data)
  )
  const { data: listUnPaidDues } = useSWR(
    'listUnPaidDues',
    async () => await requests.dues.unPaidDues().then((res) => res.data)
  )

  useEffect(() => {
    if (listDues) setDues(listDues)
    if (listPaidDues) setPaidDues(listPaidDues)
    if (listUnPaidDues) setUnPaidDues(listUnPaidDues)
  }, [listDues, listPaidDues, listUnPaidDues])

  const data = {
    dues,
    paidDues,
    unPaidDues
  }

  return <Context.Provider value={data}>{children}</Context.Provider>
}

export const useDues = () => useContext(Context)
