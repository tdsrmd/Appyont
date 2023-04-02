import { ErrorMessage, useField } from 'formik'
import Datepicker from 'react-tailwindcss-datepicker'

const DatePicker = () => {
  const [field, , helpers] = useField('date')
  const { value } = field
  const handleChange = (date) => {
    helpers.setValue(date.startDate)
  }

  return (
    <div>
      <Datepicker
        {...field}
        i18n={'tr'}
        primaryColor={'emerald'}
        inputClassName="bg-[#f1f1f1] rounded-md py-3 px-4 font-normal outline-none focus:ring-transparent"
        placeholder="Tarih Seçiniz"
        useRange={false}
        asSingle={true}
        displayFormat={'DD/MM/YYYY'}
        value={{
          startDate: value,
          endDate: value
        }}
        onChange={handleChange}
      />
      <ErrorMessage component="small" name={field?.name || 'unnamed'} className="text-red-500" />
    </div>
  )
}

export default DatePicker
