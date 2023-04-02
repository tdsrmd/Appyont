import { Input, Button } from 'components/Form'
import { Form, Formik } from 'formik'
import { IoIosArrowBack } from 'react-icons/io'
import { Link, useNavigate } from 'react-router-dom'

const ForgetPassword = () => {
  const navigate = useNavigate()
  return (
    <>
      <div className="w-[450px] flex flex-col gap-y-5">
        <h3 className="text-4xl font-semibold">Şifremi Unuttum</h3>
        <p className="text-sgray-400 font-medium text-sm">Lütfen sisteme kayıtlı kullanıcı adınızı giriniz.</p>
        <Formik>
          <Form className="flex flex-col gap-y-5">
            <Input placeholder="Lütfen kullanıcı adınızı girin." />
            <div>
              <Button text="Gönder" color="black" />
            </div>
          </Form>
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

export default ForgetPassword
