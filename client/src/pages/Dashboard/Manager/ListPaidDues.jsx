import Card from 'components/Card'
import LoadingData from 'components/LoadingData'
import Alert from 'components/Alert'
import { IoAlertOutline } from 'react-icons/io5'
import { useDues } from 'context/DuesContext'

const ListPaidDues = () => {
  const { paidDues } = useDues()

  return (
    <div>
      <Card title="Aidatı Ödeyenler">
        <span className="col-span-2 font-light text-sm text-gray-600">En son ödeme yapan daire en başta görünür.</span>
        {!paidDues ? (
          <LoadingData data={paidDues} />
        ) : paidDues?.length < 1 ? (
          <Alert color="dgreen">
            <IoAlertOutline className="h-10 w-10" />
            Bu ay hiç kimse aidat ödemedi
          </Alert>
        ) : (
          <div className="col-span-2 grid grid-cols-5 gap-5">
            {paidDues?.map((item) => (
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

export default ListPaidDues
