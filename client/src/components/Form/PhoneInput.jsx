import { ErrorMessage, useField } from 'formik'
import MaskedInput from 'react-text-mask'

function PhoneInput(props) {
  const [field, , helpers] = useField(props)

  const handleBlur = (e) => {
    const { value } = e.target
    const format = value.replace(/[^0-9]/g, '')
    helpers.setValue(format)
  }

  return (
    <div>
      <MaskedInput
        {...field}
        {...props}
        onBlur={handleBlur}
        guide={false}
        mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, ' ', /\d/, /\d/, ' ', /\d/, /\d/]}
        className="bg-gray-100 rounded-md text-sgray-700 text-sm py-3 px-4 outline-none w-full"
      />
      <ErrorMessage component="small" name={field?.name || 'unnamed'} className="text-red-500" />
    </div>
  )
}

export default PhoneInput
