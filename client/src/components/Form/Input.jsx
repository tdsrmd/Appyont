import { useField, ErrorMessage } from 'formik'

const SetupInput = (props) => {
  const [field] = useField(props)
  return (
    <div>
      <input
        {...props}
        {...field}
        className="bg-gray-100 rounded-md text-sgray-700 text-sm py-3 px-4 outline-none w-full"
      />
      <ErrorMessage component="small" name={field?.name || 'unnamed'} className="text-red-500" />
    </div>
  )
}

export default SetupInput
