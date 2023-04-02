import { colorClasses } from 'helpers/global'

const Alert = ({ color, children }) => {
  return (
    <div className={`col-span-2 font-light text-sgray-500 ${colorClasses[color]} p-4 rounded-lg col-center capitalize`}>
      {children}
    </div>
  )
}

export default Alert
