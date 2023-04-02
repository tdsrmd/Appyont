import { ErrorMessage, useField } from 'formik'

const Select = ({ label, options, ...props }) => {
  const [field] = useField(props.name)
  return (
    <div className="flex flex-col">
      <select
        {...field}
        {...props}
        className="bg-gray-100 rounded-md text-sgray-700 text-sm py-3 px-4 outline-none appearance-none"
      >
        <option value="" disabled>
          {label}
        </option>
        {options?.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ErrorMessage component="small" name={field?.name || 'unnamed'} className="text-red-500" />
    </div>
  )
}

export default Select
