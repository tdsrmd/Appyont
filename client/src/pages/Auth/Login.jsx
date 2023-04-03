import { Link, useNavigate } from 'react-router-dom'
import { Form, Formik } from 'formik'
import { loginSchema } from 'schemas/auth'
import requests from 'api'

import { Button, Input } from 'components/Form'
import { useState } from 'react'
import { useAuth } from 'context/AuthContext'

const initialValues = {
  username: '',
  password: ''
}

const Login = () => {
  const { setupInfo, setSetupInfo, login } = useAuth()
  const [error, setError] = useState()
  const navigate = useNavigate()

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const { data } = await requests.auth.login(values)
      login(data?.user)
      navigate('/')
    } catch (error) {
      console.log(error)
      setError(error)
    } finally {
      setSubmitting(false)
      setSetupInfo(false)
    }
  }

  return (
    <>
      <div className="flex flex-col gap-y-6 xl:w-[450px] w-full">
        <div className="flex flex-col gap-y-5">
          <h3 className="text-4xl font-semibold">Yönetici Girişi Yap</h3>
          <p className="text-sgray-400 font-medium text-sm">
            En kolay, güvenilir ve şeffaf şekilde apartmanınızı yönetin.
          </p>
        </div>
        {error && (
          <div className="text-sblack p-3 text-sm rounded-lg bg-dpurple">
            <div className="font-semibold">
              Kullanıcı adı ya da Şifre hatalı.
            </div>
            <div>Giriş bilgileriniz gözden geçirip tekrar deneyiniz.</div>
          </div>
        )}
        {setupInfo && (
          <div className="text-sblack p-3 text-sm rounded-lg bg-dpurple">
            <div className="font-semibold">
              Başırılı bir şekilde kayıt oldunuz.
            </div>
            <div>Lütfen kayıt olduğunuz bilgilerle giriş yapınız.</div>
          </div>
        )}
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={loginSchema}
        >
          {({ isSubmitting }) => (
            <Form className="flex flex-col gap-y-5">
              <Input name="username" placeholder="Kullanıcı adınız" />
              <Input name="password" type="password" placeholder="Şifreniz" />
              <div className="flex justify-between items-center">
                <Link to="/apartmansakinigirisyap" className="self-end">
                  <div className="text-sblue text-sm font-medium">
                    Apartman Sakini Girişi Yap
                  </div>
                </Link>
                <Link to="/sifremiunuttum" className="">
                  <div className="text-sgray-500 text-sm font-medium">
                    Şifremi Unuttum
                  </div>
                </Link>
              </div>
              <div>
                <Button
                  text="Giriş Yap"
                  type="submit"
                  disabled={isSubmitting}
                  loading={isSubmitting}
                />
              </div>
            </Form>
          )}
        </Formik>
      </div>
      <div className="absolute top-10 right-0 xl:w-[450px] flex items-center justify-between">
        <span className="h-12"></span>
        <p className="text-sgray-400 text-sm font-semibold">
          Apartman Yöneticisi misiniz?
          <Link to="/kayitol">
            <span className="text-sblue"> Kayıt Ol</span>
          </Link>
        </p>
      </div>
    </>
  )
}

export default Login
