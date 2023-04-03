import requests from 'api'
import Card from 'components/Card'
import { Button, Input, PhoneInput, Radio } from 'components/Form'
import ToastAlert from 'components/ToastAlert'
import { useApartment } from 'context/ApartmentContext'
import { Form, Formik } from 'formik'
import { useState } from 'react'
import { AiFillCheckCircle } from 'react-icons/ai'
import { toast } from 'react-toastify'
import { newResident } from 'schemas/resident'
import { mutate } from 'swr'

const initialState = {
  flatNumber: '',
  firstName: '',
  lastName: '',
  phone: '',
  phone2: '',
  carPlate: '',
  role: 'landlord'
}

const AddResident = () => {
  const { apartment } = useApartment()
  const [oneMorePhone, setOneMorePhone] = useState(false)

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const body = {
        ...values,
        phone2: undefined,
        apartmentId: apartment.id,
        phone: values.phone2
          ? [Number(values.phone), Number(values.phone2)]
          : values.phone
          ? [Number(values.phone)]
          : undefined,
        carPlate: values.carPlate || undefined
      }
      await requests.resident.newResident(body)
      mutate('listResidents')
      mutate('listDues')
      mutate('listUnPaidDues')
      mutate('listPaidDues')
      toast(
        <ToastAlert
          text="Başarılı bir şekilde eklendi."
          title={values.firstName}
        >
          <AiFillCheckCircle className="w-6 h-6 text-[#3ec786]" />
        </ToastAlert>
      )
      resetForm()
    } catch (error) {
      console.log(error)
      error.response.status === 409
        ? toast.error(error.response.data.message)
        : toast.error('Bir hata oluştu.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Card title="Yeni Daire Ekle">
      <Card.Container>
        <Formik
          initialValues={initialState}
          onSubmit={handleSubmit}
          validationSchema={newResident}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="flex flex-col gap-y-5">
                <div className="flex gap-x-5">
                  <Radio
                    id="landlord"
                    label="Ev Sahibi"
                    name="role"
                    value="landlord"
                  />
                  <Radio
                    id="tenant"
                    label="Kiracı"
                    name="role"
                    value="tenant"
                  />
                </div>
                <div className="grid xl:grid-cols-2 gap-5">
                  <Input name="firstName" placeholder="Dairede oturanın ismi" />
                  <Input
                    name="lastName"
                    placeholder="Dairede oturanın soyismi"
                  />
                  <Input name="flatNumber" placeholder="Daire No" />
                  <PhoneInput name="phone" placeholder="Telefon Numarası" />
                  <Input name="carPlate" placeholder="Araç Plakası" />
                  {oneMorePhone ? (
                    <PhoneInput name="phone2" placeholder="Telefon Numarası" />
                  ) : (
                    <div className="text-sm text-amber-800">
                      <span
                        className="cursor-pointer"
                        onClick={() => setOneMorePhone(true)}
                      >
                        Bir telefon numarası daha ekle.
                      </span>
                    </div>
                  )}
                </div>
                <div className="self-center">
                  <Button
                    text="Kaydet"
                    color="theme-500"
                    type="submit"
                    disabled={isSubmitting}
                    loading={isSubmitting}
                  ></Button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </Card.Container>
    </Card>
  )
}

export default AddResident
