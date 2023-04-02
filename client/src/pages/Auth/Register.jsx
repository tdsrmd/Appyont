import requests from 'api'
import { useState } from 'react'
import { IoIosArrowBack } from 'react-icons/io'
import { Link, useNavigate } from 'react-router-dom'
import { Form, Formik } from 'formik'
import { Button, Input } from 'components/Form'
import { registerSchema } from 'schemas/auth'
import { useAuth } from 'context/AuthContext'

const initialValues = {
  firstName: '',
  lastName: '',
  username: '',
  password: '',
  passwordAgain: ''
}

const Register = () => {
  const navigate = useNavigate()
  const [error, setError] = useState()
  const { setUser } = useAuth()

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const { data } = await requests.auth.register(values)
      localStorage.setItem('user', JSON.stringify(data?.user))
      setUser(data?.user)
      navigate('/kurulum')
    } catch (error) {
      setError(error.response.data.message)
    } finally {
      setSubmitting(false)
    }
  }
  return (
    <>
      <div className="flex flex-col gap-y-6 w-[450px]">
        <div className="flex flex-col gap-y-3">
          <h3 className="text-4xl font-semibold">Yönetici Hesabı Oluşturun</h3>
          <p className="text-sgray-400 font-medium text-sm">
            Sadece yöneticiler kayıt olabilir. Yöneticiniz size giriş için apartman sakini kullanıcı adı ve şifrenizi
            verecektir.
          </p>
        </div>
        {error && (
          <div className="bg-dpurple text-sblack p-3 text-sm rounded-lg">
            <div className="font-semibold">Kullanıcı adı başkası tarafından kullanılıyor.</div>
            <div>
              Kayıt bilgileriniz gözden geçirip tekrar deneyiniz. Eğer bu kullanıcı zaten sizseniz
              <Link to="/girisyap">
                <span className="font-bold"> Giriş Yapabilir </span>
              </Link>
              ya da
              <Link to="/sifremiunuttum">
                <span className="font-bold "> Şifremi Unuttum</span>
              </Link>
              'a tıklayarak şifrenizi sıfırlayabilirsiniz.
            </div>
          </div>
        )}
        <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={registerSchema}>
          {({ isSubmitting }) => (
            <Form className="flex flex-col gap-y-5">
              <div className="grid grid-cols-2 gap-x-5">
                <Input name="firstName" placeholder="Yöneticinin Adı" />
                <Input name="lastName" placeholder="Yöneticinnin Soyadı" />
              </div>
              <Input name="username" placeholder="Kullanıcı adı" />
              <Input name="password" placeholder="Şifre" type="password" />
              <Input name="passwordAgain" placeholder="Şifre Tekrar" type="password" />
              <div>
                <Button text="Kayıt Ol" type="submit" disabled={isSubmitting} loading={isSubmitting} />
              </div>
            </Form>
          )}
        </Formik>
      </div>
      <div className="absolute top-10 flex items-center justify-between w-[450px]">
        <div className="bg-sgray-100 rounded-full p-4 cursor-pointer" onClick={() => navigate(-1)}>
          <IoIosArrowBack />
        </div>
        <p className="text-sgray-400 text-sm font-semibold">
          Zaten üye misiniz?
          <Link to="/girisyap">
            <span className="text-sblue"> Giriş Yap</span>
          </Link>
        </p>
      </div>
    </>
  )
}

export default Register
