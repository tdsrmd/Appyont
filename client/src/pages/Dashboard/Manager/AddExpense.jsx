import requests from 'api'
import Card from 'components/Card'
import { Button, Select, Input, Amount } from 'components/Form'
import ToastAlert from 'components/ToastAlert'
import { Form, Formik } from 'formik'
import { formatAmount } from 'helpers/global'
import { GiMoneyStack } from 'react-icons/gi'
import { AiFillCheckCircle } from 'react-icons/ai'
import { toast } from 'react-toastify'
import { newExpense } from 'schemas/expense'
import { mutate } from 'swr'

const initialValues = {
  type: '',
  amount: '',
  description: ''
}

const debtOptions = [
  { value: 'bill', label: 'Fatura' },
  { value: 'maintenance', label: 'Bakım' },
  { value: 'repair', label: 'Onarım' },
  { value: 'other', label: 'Diğer' }
]
const AddExpense = () => {
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const data = {
        type: values.type,
        amount: formatAmount(values.amount),
        description: values.description
      }
      await requests.expense.newExpense(data)
      resetForm()
      mutate('listExpenses')
      mutate('getApartment')
      mutate('lastTransactions')
      toast(
        <ToastAlert title={values.description} text="Başarılı bir şekilde eklendi">
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
    <Card title="Gider Ekle">
      <span className="col-span-2 font-light text-sm text-gray-600">
        Yeni bir gider eklediğinizde eklediğiniz miktar kasadan otomatik olarak düşecektir.
      </span>
      <Card.Container>
        <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={newExpense}>
          {({ isSubmitting }) => (
            <Form>
              <div className="flex flex-col gap-y-5">
                <div className="grid grid-cols-2 gap-5">
                  <Select label="Gider Tipini Seçin" name="type" options={debtOptions} />
                  <Amount name="amount" placeholder="Tutar" />
                  <Input placeholder="Açıklama" name="description" />
                </div>
                <div className="self-center">
                  <Button
                    text="Ekle"
                    color="theme-500"
                    type="submit"
                    iconPos="start"
                    disabled={isSubmitting}
                    loading={isSubmitting}
                  >
                    <GiMoneyStack className="w-5 h-5 text-white" />
                  </Button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </Card.Container>
    </Card>
  )
}

export default AddExpense
