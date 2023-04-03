import { ErrorMessage, useField } from 'formik'
import { formatNumber } from 'helpers/global'
import { useState } from 'react'

const Amount = ({ label, ...props }) => {
  const [field, , helpers] = useField(props)
  const [showTL, setShowTL] = useState(true)

  const handleBlur = (e) => {
    setShowTL(true)
    const { value } = e.target
    const formattedValue = formatNumber(parseInt(value.replace(/,/g, ''), 10))

    field.onBlur({ target: { name: field.name, value: formattedValue } })
  }

  const handleInput = (e) => {
    const { value } = e.target
    e.target.value = value.replace(/[^0-9]/g, '')
    helpers.setValue(value)
  }

  const handleFocus = () => {
    setShowTL(false)
  }

  return (
    <div className="form-group relative">
      <input
        type="text"
        className="bg-gray-100 rounded-md text-sgray-700 text-sm py-3 px-4 outline-none w-full"
        {...field}
        {...props}
        onFocus={handleFocus}
        onInput={handleInput}
        onBlur={handleBlur}
        value={
          field.value
            ? formatNumber(field.value) + (showTL && field.value ? ' TL' : '')
            : ''
        }
      />
      <ErrorMessage
        component="small"
        name={field?.name || 'unnamed'}
        className="text-red-500"
      />
    </div>
  )
}

export default Amount
