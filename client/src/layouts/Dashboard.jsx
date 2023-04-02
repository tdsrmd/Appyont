import Headline from 'components/Headline'
import Sidebar from 'components/Sidebar'
import { ApartmentContext } from 'context/ApartmentContext'
import { DuesContext } from 'context/DuesContext'
import { Outlet } from 'react-router-dom'
import { ToastContainer, Zoom } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { SWRConfig } from 'swr'

const swrOptions = {
  revalidateOnFocus: false
}

const Dashboard = () => {
  return (
    <SWRConfig value={swrOptions}>
      <ApartmentContext>
        <div className="grid grid-cols-[300px_auto] grid-rows-1 h-screen ">
          <div>
            <div className="w-[300px] fixed bg-white h-full">
              <Sidebar />
            </div>
          </div>
          <div className="flex flex-1 flex-col p-12 ">
            <Headline />
            <div className="py-10 ">
              <DuesContext>
                <Outlet />
              </DuesContext>
            </div>
          </div>
        </div>
        <ToastContainer
          position="bottom-left"
          draggablePercent={60}
          transition={Zoom}
          pauseOnFocusLoss={false}
          hideProgressBar={true}
          theme="dark"
          toastStyle={{ backgroundColor: '#1d2226', color: 'white', minWidth: '320px' }}
        />
      </ApartmentContext>
    </SWRConfig>
  )
}

export default Dashboard
