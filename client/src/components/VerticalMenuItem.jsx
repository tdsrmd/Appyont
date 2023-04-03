import { NavLink } from 'react-router-dom'

const VerticalMenuItem = ({ menu }) => {
  return (
    <div>
      <div className="flex flex-col">
        <h3 className="font-semibold text-lg">{menu.title}</h3>
        <div>
          {menu.submenu.map((item, i) => (
            <div className="text-sm font-medium py-2" key={i}>
              <NavLink
                key={i}
                to={item.url}
                className={({ isActive }) =>
                  isActive ? 'text-theme-500 ' : 'text-sgray-500 '
                }
              >
                {item.title}
              </NavLink>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default VerticalMenuItem
