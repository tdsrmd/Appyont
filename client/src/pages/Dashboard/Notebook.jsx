import Alert from 'components/Alert'
import Card from 'components/Card'
import LoadingData from 'components/LoadingData'
import { useApartment } from 'context/ApartmentContext'
import { useDues } from 'context/DuesContext'
import { IoAlertOutline } from 'react-icons/io5'

const Notebook = () => {
  const { paidDues } = useDues()
  const { expenses, debts } = useApartment()

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-5">
      <div>
        <Card title="Gelir" badge="Mart">
          <LoadingData data={paidDues} />
          {paidDues?.length < 1 && (
            <Alert color="lime">
              <IoAlertOutline className="h-10 w-10" />
              Bu ay herhangi bir gelir yok
            </Alert>
          )}
          {paidDues?.map((item) => (
            <Card.Payment income key={item.id} data={item} />
          ))}
        </Card>
      </div>
      <div>
        <Card title="Gider" badge="Mart">
          <LoadingData data={expenses} />
          {expenses?.length < 1 && (
            <Alert color="lime">
              <IoAlertOutline className="h-10 w-10" />
              Bu ay herhangi bir gider yok
            </Alert>
          )}
          {expenses?.map((item) => (
            <Card.Payment expense key={item.id} data={item} />
          ))}
        </Card>
      </div>
      <div>
        <Card title="Borç">
          <LoadingData data={expenses} />
          {debts?.length < 1 && (
            <Alert color="lime">
              <IoAlertOutline className="h-10 w-10" />
              Bu ay herhangi bir borç yok
            </Alert>
          )}
          {debts?.map((item) => (
            <Card.Arrears key={item.id} data={item} />
          ))}
        </Card>
      </div>
    </div>
  )
}

export default Notebook
