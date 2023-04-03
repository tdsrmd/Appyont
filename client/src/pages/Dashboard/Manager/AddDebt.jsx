import { useEffect, useState } from 'react'
import { useApartment } from 'context/ApartmentContext'
import {
  Button,
  Input,
  Radio,
  Select,
  DatePicker,
  Amount
} from 'components/Form'
import { Formik, Form } from 'formik'
import { addDept } from 'schemas/debt'
import Card from 'components/Card'
import requests from 'api'
import { toast } from 'react-toastify'
import { mutate } from 'swr'

const initialValues = {
  amount: '',
  date: '',
  type: '',
  description: '',
  residentId: '',
  picket: 'all'
}

const debtOptions = [
  { value: 'maintenance', label: 'Bakım' },
  { value: 'repair', label: 'Onarım' },
  { value: 'other', label: 'Diğer' }
]
const AddDebt = () => {
  const { residents } = useApartment()
  const [residentsOptions, setResidentsOptions] = useState()

  useEffect(() => {
    const residentsData = residents?.map((resident) => ({
      value: resident.id,
      label: `${
        resident.flatNumber
      } ${resident.firstName.toUpperCase()} ${resident.lastName.toUpperCase()}`
    }))
    setResidentsOptions(residentsData)
  }, [residents])

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const newData = { ...values, date: new Date(values.date).toISOString() }
    delete newData.picket
    values.picket === 'all' && delete newData.residentId
    try {
      await requests.debt.newDebt(newData)
      toast('Başarılı bir şekilde borç eklendi.')
      mutate('listDebts')
      resetForm()
    } catch (error) {
      console.log(error)
      toast.error('Bir hata oluştu. Sayfayı yenileyip tekrar deneyin.')
    } finally {
      setSubmitting(false)
    }
  }
  return (
    <Card title="Borç Ekle">
      <Card.Container>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={addDept}
        >
          {({ isSubmitting, values }) => (
            <Form>
              <div className="flex flex-col gap-y-5">
                <div className="flex gap-x-3">
                  <Radio
                    label="Tüm Dairelere Borç Ekle"
                    id="1"
                    value="all"
                    name="picket"
                  />
                  <Radio
                    label="Daire'ye Borç Ekle"
                    id="2"
                    value="singular"
                    name="picket"
                  />
                </div>
                <div className="grid xl:grid-cols-2 gap-5">
                  {!(values.picket === 'all') && (
                    <Select
                      label="Daire Seçiniz"
                      name="residentId"
                      options={residentsOptions}
                    />
                  )}
                  <Select
                    label="Borç Tipini Seçin"
                    name="type"
                    options={debtOptions}
                  />
                  <DatePicker name="date" />
                  <Amount placeholder="Tutar" name="amount" />
                  <Input placeholder="Açıklama" name="description" />
                </div>
                <div className="self-center">
                  <Button
                    text="Ekle"
                    color="theme-500"
                    type="submit"
                    loading={isSubmitting}
                    disabled={isSubmitting}
                  />
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </Card.Container>
    </Card>
  )
}

export default AddDebt
