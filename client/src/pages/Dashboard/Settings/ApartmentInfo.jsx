import Card from 'components/Card'
import { Amount, Button, Input } from 'components/Form'
import ToastAlert from 'components/ToastAlert'
import { Form, Formik } from 'formik'
import { AiFillCheckCircle } from 'react-icons/ai'
import { toast } from 'react-toastify'
import { useApartment } from 'context/ApartmentContext'
import requests from 'api'
import { mutate } from 'swr'
import { updateApartment } from 'schemas/apartment'
import Spinner from 'components/Spinner'

const ApartmentInfo = () => {
  const { apartment } = useApartment()
  if (!apartment) return <Spinner />

  const initialValues = {
    name: apartment.name,
    monthlyDuesAmount: apartment.monthlyDuesAmount
  }

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await requests.apartment.updateApartment(values)
      mutate('getApartment')
      toast(
        <ToastAlert title={values.description} text="Başarılı bir şekilde güncellendi.">
          <AiFillCheckCircle className="w-6 h-6 text-[#3ec786]" />
        </ToastAlert>
      )
    } catch (error) {
      console.log(error)
      toast.error('Bir hata oluştu. Sayfayı yenileyip tekrar deneyin.')
    } finally {
      setSubmitting(false)
    }
  }
  return (
    <Card title="Apartman Bilgileri">
      <Card.Container>
        <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={updateApartment}>
          {({ isSubmitting }) => (
            <Form>
              <div className="flex flex-col gap-y-5">
                <div className="col-center gap-2">
                  <div className="w-1/2">
                    <span className="text-xs font-semibold ml-1">Apartmanın Adı</span>
                    <Input name="name" />
                  </div>
                  <div className="w-1/2">
                    <span className="text-xs font-semibold ml-1">Aylık Toplanan Aidat Tutarı</span>
                    <Amount name="monthlyDuesAmount" />
                  </div>
                </div>
                <div className="self-center">
                  <Button
                    text="Güncelle"
                    color="theme-500"
                    type="submit"
                    disabled={isSubmitting}
                    loading={isSubmitting}
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

export default ApartmentInfo
