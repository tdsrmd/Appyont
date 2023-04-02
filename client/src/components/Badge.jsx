import { colorClasses } from 'helpers/global'

const Badge = (props) => {
  const { color = 'blue', title, className } = props

  return (
    <div
      className={`${className} ${colorClasses[color]} capitalize  xl:px-4  xl:py-2 xl:text-sm rounded-lg inline text-xs`}
    >
      <span>{title}</span>
    </div>
  )
}

export default Badge
