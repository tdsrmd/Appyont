import Card from 'components/Card'
import LoadingData from 'components/LoadingData'
import Alert from 'components/Alert'
import { BsCheck2All } from 'react-icons/bs'
import { useDues } from 'context/DuesContext'

const ListUnPaidDues = () => {
  const { unPaidDues } = useDues()
  return (
    <div>
      <Card title="Aidatı Ödemeyenler">
        <span className="col-span-2 font-light text-sm text-gray-600">
          Daire numarasına göre listelenir.
        </span>
        {!unPaidDues ? (
          <LoadingData data={unPaidDues} />
        ) : unPaidDues?.length < 1 ? (
          <Alert color="dgreen">
            <BsCheck2All className="h-10 w-10" />
            Bu ay tüm daireler aidat verdi
          </Alert>
        ) : (
          <div className="col-span-2 grid grid-cols-4 xl:grid-cols-5 gap-5">
            {unPaidDues?.map((item) => (
              <Card.Item
                title={item.flatNumber}
                badge={`${item.firstName} ${item.lastName.charAt(0)}.`}
                key={item.id}
              />
            ))}
          </div>
        )}
      </Card>
    </div>
  )
}

export default ListUnPaidDues
