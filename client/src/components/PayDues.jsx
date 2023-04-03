import { useState } from 'react'
import { mutate } from 'swr'
import requests from 'api'

import Badge from './Badge'
import Spinner from './Spinner'
import { toast } from 'react-toastify'

const PayDues = ({ data }) => {
  const [duesPaid, setDuesPaid] = useState(data.isPaid)
  const [loading, setLoading] = useState(false)

  const handlePayment = async () => {
    setLoading(true)
    try {
      await requests.dues.payDues(data.id)
      setDuesPaid(!duesPaid)
      mutate('listDues')
      mutate('listUnPaidDues')
      mutate('listPaidDues')
      mutate('getApartment')
      mutate('lastTransactions')
    } catch (error) {
      console.log(error)
      toast.error('Bir hata oluştu. Sayfayı yenileyip tekrar deneyin.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="select-none relative" onClick={handlePayment}>
      <input
        type="checkbox"
        id={data.resident.flatNumber}
        className="hidden peer"
        defaultChecked={duesPaid}
        disabled={loading}
      />
      <label
        htmlFor={data.resident.flatNumber}
        className={`w-full inline-flex gap-y-2 justify-center items-center flex-col text-center p-5 rounded-lg cursor-pointer ${
          duesPaid
            ? 'bg-theme-400 text-gray-600 hover:opacity-80'
            : 'bg-white hover:bg-gray-50 hover:text-gray-600 '
        }`}
      >
        <div className="text-4xl">{data.resident.flatNumber}</div>
        <Badge
          color={duesPaid ? '' : 'theme'}
          className="text-sm font-medium"
          title={`${
            data?.resident?.firstName
          } ${data?.resident?.lastName.charAt(0)}.`}
        />
      </label>
      {loading && (
        <div className="bg-white/70 rounded-lg h-full w-full absolute-center flex justify-center items-center">
          <Spinner className="h-5 w-5 text-theme-500" />
        </div>
      )}
    </div>
  )
}

export default PayDues
