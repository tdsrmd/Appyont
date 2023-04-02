import { colorClasses } from 'helpers/global'

const Badge = (props) => {
  const { color = 'blue', title, className } = props

  return (
    <div className={`${className} ${colorClasses[color]} capitalize px-4 py-2 rounded-lg inline`}>
      <span>{title}</span>
    </div>
  )
}

export default Badge
