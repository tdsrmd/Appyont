import { NavLink } from 'react-router-dom'

const MobileTopMenuItem = ({ menus, onCancel }) => {
  return (
    <div className="bg-dgray-200 w-full absolute top-10 h-[calc(100vh_-_94px)] left-0 z-20 p-4">
      <div className="row-center h-full">
        <div className="p-4 bg-white w-full rounded-lg">
          {menus.map((menu, i) => (
            <div className="col-span-2 mb-4 text-center" key={i}>
              <div className="font-semibold text-lg">{menu.title}</div>
              {menu.submenu.map((sub, i) => (
                <NavLink to={sub.url} onClick={onCancel} key={i}>
                  <div className="text-sm font-medium py-2">{sub.title}</div>
                </NavLink>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default MobileTopMenuItem
