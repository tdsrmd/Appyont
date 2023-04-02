import Card from 'components/Card'
import Table from 'components/Table'
import { formatDate, whatType } from 'helpers/global'
import CardAlert from 'components/CardAlert'
import LoadingData from 'components/LoadingData'
import { useApartment } from 'context/ApartmentContext'

const ListExpenses = () => {
  const { expenses } = useApartment()
  const newData = expenses?.map(({ id, amount, description, type, createdAt }) => ({
    id,
    amount: `${amount} TL`,
    description,
    type: whatType(type),
    createdAt: formatDate(createdAt)
  }))
  return (
    <div>
      <Card title="Giderler">
        <span className="col-span-2 font-light text-sm text-gray-600">
          Bir gideri sildiğinizde, sildiğiniz miktar kasaya otomatik olarak eklenecektir.
        </span>
        <Card.Container>
          {!expenses ? (
            <LoadingData data={expenses} />
          ) : expenses?.length < 1 ? (
            <CardAlert text="gider" url="/yonetim/giderekle" />
          ) : (
            <Table
              headings={['Fiyat', 'Açıklama', 'Tip', 'Oluşturuldu']}
              gridCols={['1fr', '3fr', '1fr', '2fr', 'auto']}
              data={newData}
              mutateValues={['listExpenses', 'getApartment']}
              deleteFetchKeys={['expense', 'deleteExpense']}
            />
          )}
        </Card.Container>
      </Card>
    </div>
  )
}

export default ListExpenses
