import Card from 'components/Card'
import PayDues from 'components/PayDues'
import { BsCheck2All } from 'react-icons/bs'
import LoadingData from 'components/LoadingData'
import CardAlert from 'components/CardAlert'
import Alert from 'components/Alert'
import { useDues } from 'context/DuesContext'
import { useApartment } from 'context/ApartmentContext'

const Dues = () => {
  const { dues, unPaidDues } = useDues()
  const { apartment } = useApartment()
  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
      <div className="xl:col-span-2">
        <Card title="Apartman Sakinleri">
          <span className="col-span-2 font-light text-sm text-gray-600">
            Aidat ödeyen dairelerin üstüne tıklayarak ödedi olarak işaretleyin.
            Dairelerden aylık toplanan miktar(
            {apartment?.monthlyDuesAmount} TL), herhangi bir daire aidat ödemesi
            yaptığında kasaya otomatik eklenecektir.
          </span>
          <div className="col-span-5">
            <LoadingData data={dues} />
            {dues?.length < 1 && (
              <CardAlert text="daire" url="/yonetim/daireekle" />
            )}
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5">
              {dues?.map((item) => (
                <PayDues data={item} key={item.id} />
              ))}
            </div>
          </div>
        </Card>
      </div>
      <div className="xl:col-span-1">
        <Card title="Bu ay aidat ödemeyenler">
          <LoadingData data={unPaidDues} />
          {unPaidDues?.map((item) => (
            <Card.Item
              title={item.flatNumber}
              badge={`${item.firstName} ${item.lastName.charAt(0)}.`}
              badgeColor="theme"
              key={item.id}
            />
          ))}
          {unPaidDues < 1 && (
            <Alert color="white">
              <BsCheck2All className="text-theme-500 h-10 w-10" />
              Bu ay tüm daireler aidatını ödedi.
            </Alert>
          )}
        </Card>
      </div>
    </div>
  )
}

export default Dues
