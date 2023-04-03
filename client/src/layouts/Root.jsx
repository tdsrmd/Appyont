import { Outlet } from 'react-router-dom'

const Root = () => {
  return (
    <div className="font-inter px-3 xl:px-0 relative">
      <Outlet />
    </div>
  )
}

export default Root
