import { NavLink } from 'react-router-dom'

const MenuItem = ({ item, ...props }) => {
  const { name, url, icon: Icon } = item
  return (
    <NavLink to={url} className={({ isActive }) => (isActive ? 'bg-theme rounded-2xl' : 'text-dblue-100')}>
      <div {...props} className="flex items-center gap-x-2 hover:bg-theme/50 p-4 hover:rounded-2xl">
        <Icon className="w-5 h-5 fill-current" />
        <span className="text-sm font-medium">{name}</span>
      </div>
    </NavLink>
  )
}

export default MenuItem
