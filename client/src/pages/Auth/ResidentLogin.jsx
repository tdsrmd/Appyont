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

const ResidentLogin = () => {
  const { setUser } = useAuth()
  const [error, setError] = useState()

  const navigate = useNavigate()
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const { data } = await requests.auth.residentLogin(values)
      localStorage.setItem('user', JSON.stringify(data?.user))
      setUser(data?.user)
      navigate('/anasayfa')
    } catch (error) {
      console.log(error)
      setError(error)
    } finally {
      setSubmitting(false)
    }
  }
  return (
    <>
      <div className="flex flex-col gap-y-6 w-[450px]">
        <div className="flex flex-col gap-y-3">
          <h3 className="text-4xl font-semibold">Apartman Sakini Giriş Yap</h3>
          <p className="text-sgray-400 font-medium text-sm">
            En kolay, güvenilir ve şeffaf şekilde apartmanınızı yönetin.
          </p>
        </div>
        {error && (
          <div className="text-sblack p-3 text-sm rounded-lg bg-dpurple">
            <div className="font-semibold">Kullanıcı adı ya da Şifre hatalı.</div>
            <div>Giriş bilgileriniz gözden geçirip tekrar deneyiniz.</div>
          </div>
        )}
        <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={loginSchema}>
          {({ isSubmitting }) => (
            <Form className="flex flex-col gap-y-5">
              <Input name="username" placeholder="Kullanıcı adınız" />
              <Input name="password" type="password" placeholder="Şifreniz" />

              <Link to="/girisyap" className="self-end">
                <div className="text-sblue text-sm font-medium">Yönetici Girişi Yap</div>
              </Link>
              <div>
                <Button text="Giriş Yap" type="submit" disabled={isSubmitting} loading={isSubmitting} />
              </div>
            </Form>
          )}
        </Formik>
      </div>
      <div className="absolute top-10 w-[450px] flex items-center justify-between">
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

export default ResidentLogin
