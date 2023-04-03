import requests from 'api'
import Card from 'components/Card'
import { Button, Input } from 'components/Form'
import Spinner from 'components/Spinner'
import ToastAlert from 'components/ToastAlert'
import { useApartment } from 'context/ApartmentContext'
import { Form, Formik } from 'formik'
import { AiFillCheckCircle } from 'react-icons/ai'
import { toast } from 'react-toastify'
import { updateManager } from 'schemas/apartment'
import { mutate } from 'swr'

const ManagerInfo = () => {
  const { apartment } = useApartment()
  if (!apartment) return <Spinner />

  const initialValues = {
    firstName: apartment.manager.firstName || '',
    lastName: apartment.manager.lastName || '',
    username: apartment.manager.username || '',
    password: '',
    passwordAgain: ''
  }

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const body = {
      firstName: values.firstName,
      lastName: values.lastName,
      username: values.username,
      password: values.password ? values.password : undefined,
      passwordAgain: values.passwordAgain ? values.passwordAgain : undefined
    }
    try {
      await requests.auth.updateUser(body)
      mutate('getApartment')
      toast(
        <ToastAlert
          title={values.description}
          text="Başarılı bir şekilde güncellendi."
        >
          <AiFillCheckCircle className="w-6 h-6 text-[#3ec786]" />
        </ToastAlert>
      )
      resetForm({
        values: {
          firstName: apartment.manager.firstName || '',
          lastName: apartment.manager.lastName || '',
          username: apartment.manager.username || '',
          password: '',
          passwordAgain: ''
        }
      })
    } catch (error) {
      console.log(error)
      toast.error('Bir hata oluştu. Sayfayı yenileyip tekrar deneyin.')
    } finally {
      setSubmitting(false)
    }
  }
  return (
    <Card title="Yönetici Giriş Bilgisi">
      <Card.Container>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={updateManager}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="flex flex-col gap-y-5">
                <div className="grid xl:grid-cols-2 gap-x-5">
                  <div className="flex flex-col gap-y-5 mb-5 xl:mb-0">
                    <div>
                      <span className="text-xs font-semibold ml-1">İsim</span>
                      <Input name="firstName" />
                    </div>
                    <div>
                      <span className="text-xs font-semibold ml-1">
                        Soyisim
                      </span>
                      <Input name="lastName" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-y-5">
                    <div>
                      <span className="text-xs font-semibold ml-1">
                        Kullanıcı Adı
                      </span>
                      <Input name="username" />
                    </div>
                    <div>
                      <span className="text-xs font-semibold ml-1">
                        Yeni Şifre
                      </span>
                      <Input name="password" type="password" />
                    </div>
                    <div>
                      <span className="text-xs font-semibold ml-1">
                        Yeni Şifre Tekrar
                      </span>
                      <Input name="passwordAgain" type="password" />
                    </div>
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

export default ManagerInfo
