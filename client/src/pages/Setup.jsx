import { Input, Button } from 'components/Form'
import { useState } from 'react'
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io'
import { BsFillSendFill, BsCheckLg } from 'react-icons/bs'
import { Form, Formik } from 'formik'
import { stepOne, stepTwo, stepThree, stepFour } from 'schemas/setup'
import { useAuth } from 'context/AuthContext'
import requests from 'api'
import { useNavigate } from 'react-router-dom'

const Setup = () => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [data, setData] = useState(null)

  const handleSubmit = (values) => {
    const newData = { ...data, ...values }
    setData(newData)
    setCurrentStepIndex(currentStepIndex + 1)
  }

  const steps = [
    <StepOne next={handleSubmit} data={data} />,
    <StepTwo next={handleSubmit} data={data} prev={() => setCurrentStepIndex(currentStepIndex - 1)} />,
    <StepThree next={handleSubmit} data={data} prev={() => setCurrentStepIndex(currentStepIndex - 1)} />,
    <StepFour
      data={data}
      next={() => setCurrentStepIndex(currentStepIndex + 1)}
      prev={() => setCurrentStepIndex(currentStepIndex - 1)}
    />
  ]
  const currentStep = steps[currentStepIndex]

  return (
    <div className="grid  xl:grid-cols-[500px_auto] h-screen">
      <div className="bg-setupback bg-cover bg-center hidden xl:inline">
        <div className="col-center h-full">
          <div>
            <Stepper step={currentStepIndex} numberOf={0} text="Apartman Ismi" descireption="Apartman ismini girin." />
            <Stepper step={currentStepIndex} numberOf={1} text="Aidat" descireption="Aylık toplanan aidat miktarı." />
            <Stepper step={currentStepIndex} numberOf={2} text="Kasa" descireption="Kasada bulunan miktar." />
            <Stepper
              step={currentStepIndex}
              numberOf={3}
              text="Hesap oluşturun"
              descireption="Apartman sakinleri için hesap oluşturun."
              finish
            />
          </div>
        </div>
      </div>
      <div className="row-center relative h-full">
        <div className="xl:w-3/6 flex flex-col gap-y-3 w-full">{currentStep}</div>
      </div>
    </div>
  )
}

export default Setup
const StepOne = ({ next, data }) => {
  return (
    <Formik initialValues={{ name: data?.name ? data.name : '' }} onSubmit={next} validationSchema={stepOne}>
      <Form className="flex flex-col gap-y-5">
        <StepHeader text="Apartman ismi" descireption="Yöneticisi olduğunuz apartmanın ismini giriniz." />
        <Input name="name" placeholder="" />
        <div className="self-end">
          <Button text="Devam" color="blue" type="submit">
            <IoIosArrowForward />
          </Button>
        </div>
      </Form>
    </Formik>
  )
}
const StepTwo = ({ next, prev, data }) => {
  return (
    <Formik
      initialValues={{ monthlyDuesAmount: data?.monthlyDuesAmount ? data.monthlyDuesAmount : '' }}
      onSubmit={next}
      validationSchema={stepTwo}
    >
      <Form className="flex flex-col gap-y-5">
        <StepHeader
          text="Aidat"
          descireption="Tek bir daireden aldığınız aidat tutarını giriniz. Örneğin aylık 200 TL toplanıyorsa sadece 200 yazınız."
        />
        <Input name="monthlyDuesAmount" placeholder="Tutar" />
        <div className="flex justify-between items-center">
          <div className=" order-2">
            <Button text="Devam" color="blue" type="submit">
              <IoIosArrowForward />
            </Button>
          </div>
          <div className=" order-1">
            <Button text="Geri" color="gray" iconPos="start" onClick={prev}>
              <IoIosArrowBack />
            </Button>
          </div>
        </div>
      </Form>
    </Formik>
  )
}
const StepThree = ({ prev, data, next }) => {
  return (
    <Formik initialValues={{ till: data?.till ? data.till : '' }} onSubmit={next} validationSchema={stepThree}>
      <Form className="flex flex-col gap-y-5">
        <StepHeader text="Kasa" descireption="Şu anda kasada biriken tutarı giriniz." />
        <Input name="till" placeholder="Tutar" />
        <div className="flex justify-between items-center">
          <div className=" order-2">
            <Button text="Devam" color="blue" type="submit">
              <IoIosArrowForward />
            </Button>
          </div>
          <div className=" order-1">
            <Button text="Geri" color="gray" iconPos="start" onClick={prev}>
              <IoIosArrowBack />
            </Button>
          </div>
        </div>
      </Form>
    </Formik>
  )
}
const StepFour = ({ data, prev }) => {
  const { user, setUser, setSetupInfo } = useAuth()
  const navigate = useNavigate()
  const [error, setError] = useState(null)

  const handleSubmit = async (values, { setSubmitting }) => {
    const newData = { ...data, ...values }
    const apartment = {
      name: newData.name,
      till: Number(newData.till),
      monthlyDuesAmount: Number(newData.monthlyDuesAmount),
      managerId: user.id
    }

    try {
      await requests.auth.newResidentsUsernameControl({
        username: values.username,
        password: values.password,
        passwordAgain: values.passwordAgain
      })
      const newApartment = await requests.apartment.newApartment(apartment)
      const body = {
        username: values.username,
        password: values.password,
        passwordAgain: values.passwordAgain,
        apartmentId: newApartment?.data?.id
      }
      await requests.auth.residentsRegister(body)

      localStorage.clear()
      setSetupInfo('Başarılı şekilde kayıt oldunuz lütfen giriş yapınız.')
      setUser(null)
      navigate('/girisyap')
    } catch (error) {
      error.response.status === 409 && setError(error.response.data.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Formik
      initialValues={{
        username: '',
        password: '',
        passwordAgain: ''
      }}
      validationSchema={stepFour}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="flex flex-col gap-y-5">
          <StepHeader
            text="Apartman Sakinleri için Hesap Oluşturun"
            descireption="Apartman sakinleri için bir kullanıcı adı ve şifre oluşturun. Bu
            kullanıcı adı ve şifreye sahip olan tüm apartman sakinleri apartmanın
            tüm akışını görebilir. Bu yüzden kullanıcı adını ve şifreyi apartman
            grubunuzda paylaşabilirsiniz."
          />
          {error && (
            <div className="bg-dpurple text-sblack p-3 text-sm rounded-lg">
              <div className="font-semibold">{error}</div>
              <div>Girdiğiniz bilgileri kontrol ederek tekrar deneyin.</div>
            </div>
          )}
          <Input name="username" placeholder="Kullanıcı Adı" />
          <Input name="password" placeholder="Şifre" type="password" />
          <Input name="passwordAgain" placeholder="Şifre Tekrar" type="password" />
          <div className="flex justify-between items-center">
            <div className="order-2">
              <Button
                text="Oluştur ve Bitir"
                type="submit"
                color="green"
                disabled={isSubmitting}
                loading={isSubmitting}
              >
                <BsFillSendFill />
              </Button>
            </div>
            <div className="order-1">
              <Button text="Geri" color="gray" iconPos="start" onClick={prev}>
                <IoIosArrowBack />
              </Button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  )
}

const StepHeader = (props) => {
  const { text, descireption } = props
  return (
    <>
      <h3 className="text-lg font-semibold">{text}</h3>
      <p className="text-sgray-400 font-medium text-sm">{descireption}</p>
    </>
  )
}
const Stepper = (props) => {
  const { step, numberOf, text, descireption, finish } = props
  return (
    <div className={`${step === numberOf ? 'text-white' : 'text-white/60'}`}>
      <div className="flex items-center gap-x-5">
        <div
          className={`w-12 h-12 row-center rounded-lg ${
            step === numberOf ? 'bg-theme-500 border border-theme-500' : 'border border-dashed border-white/30'
          }`}
        >
          {step >= numberOf + 1 ? <BsCheckLg className="w-6 h-6 fill-theme-500" /> : numberOf + 1}
        </div>
        <div className="flex flex-col justify-between h-12">
          <h3 className="text-lg font-semibold">{text}</h3>
          <p className="text-xs text-white/30">{descireption}</p>
        </div>
      </div>
      {!finish && <div className="border-l border-dashed border-white/30 block h-12 ml-6 my-0.5"></div>}
    </div>
  )
}
