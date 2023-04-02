import { IoAlertOutline } from 'react-icons/io5'
import { Link } from 'react-router-dom'

const CardAlert = ({ text, url }) => {
  return (
    <div className="row-center col-span-2 my-2 ">
      <div className="font-light text-sgray-500 bg-theme p-5 rounded-lg col-center">
        <IoAlertOutline className="w-10 h-10" />
        <div className="mt-2">
          Kayıtlı {text} bulunamadı. <span className="capitalize">{text}</span> eklemek için
          <Link to={url}>
            <span className=" font-medium text-black"> tıklayın</span>
          </Link>
          .
        </div>
      </div>
    </div>
  )
}

export default CardAlert
