import { useField } from 'formik'

const Radio = ({ id, label, ...props }) => {
  const [field] = useField(props)
  return (
    <div className="flex items-center">
      <label
        className="relative flex cursor-pointer items-center rounded-full p-3"
        htmlFor={id}
      >
        <input
          type="radio"
          id={id}
          {...field}
          {...props}
          checked={field.value === props.value}
          className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-blue-gray-200 text-[#04baba] transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-9 before:w-9 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-[#04baba] checked:before:bg-[#04baba] hover:before:opacity-10"
        />
        <div className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-[#04baba] opacity-0 transition-opacity peer-checked:opacity-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3.5 w-3.5"
            viewBox="0 0 16 16"
            fill="currentColor"
          >
            <circle data-name="ellipse" cx="8" cy="8" r="8"></circle>
          </svg>
        </div>
      </label>
      <label
        className="mt-px cursor-pointer select-none font-light text-gray-700"
        htmlFor={id}
      >
        {label}
      </label>
    </div>
  )
}

export default Radio
