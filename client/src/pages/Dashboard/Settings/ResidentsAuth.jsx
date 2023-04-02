import requests from 'api'
import Card from 'components/Card'
import { Button, Input } from 'components/Form'
import Spinner from 'components/Spinner'
import ToastAlert from 'components/ToastAlert'
import { useApartment } from 'context/ApartmentContext'
import { Form, Formik } from 'formik'
import { AiFillCheckCircle } from 'react-icons/ai'
import { toast } from 'react-toastify'
import { residentsAuth } from 'schemas/auth'
import { mutate } from 'swr'

const ResidentsAuth = () => {
  const { apartment } = useApartment()
  if (!apartment) return <Spinner />

  const initialValues = {
    id: apartment.residentsLogin.id,
    username: apartment.residentsLogin.username,
    password: '',
    passwordAgain: ''
  }

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await requests.auth.updateResidentsAuth(values)
      toast(
        <ToastAlert title={values.description} text="Başarılı bir şekilde güncellendi.">
          <AiFillCheckCircle className="w-6 h-6 text-[#3ec786]" />
        </ToastAlert>
      )
      mutate('getApartment')
    } catch (error) {
      console.log(error)
      toast.error('Bir hata oluştu. Sayfayı yenileyip tekrar deneyin.')
    } finally {
      setSubmitting(false)
    }
  }
  return (
    <Card title="Daire Giriş Bilgisi">
      <Card.Container>
        <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={residentsAuth}>
          {({ isSubmitting }) => (
            <Form>
              <div className="flex flex-col gap-y-5">
                <div className="col-center gap-2">
                  <div className="w-full xl:w-1/2">
                    <span className="text-xs font-semibold ml-1">Kullanıcı Adı</span>
                    <Input name="username" />
                  </div>
                  <div className="w-full xl:w-1/2">
                    <span className="text-xs font-semibold ml-1">Yeni Şifre</span>
                    <Input name="password" type="password" />
                  </div>
                  <div className="w-full xl:w-1/2">
                    <span className="text-xs font-semibold ml-1">Yeni Şifre Tekrar</span>
                    <Input name="passwordAgain" type="password" />
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

export default ResidentsAuth
