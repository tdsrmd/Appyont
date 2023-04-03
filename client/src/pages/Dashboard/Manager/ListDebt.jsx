import Card from 'components/Card'
import Table from 'components/Table'
import { formatDateNoHour, whatType } from 'helpers/global'
import CardAlert from 'components/CardAlert'
import LoadingData from 'components/LoadingData'
import { useApartment } from 'context/ApartmentContext'

const ListDebt = () => {
  const { debts } = useApartment()

  const newData = debts?.map((item) => ({
    ...item,
    flatNumber: (
      <div className="text-center font-semibold">{item.flatNumber}</div>
    ),
    type: whatType(item.type),
    date: formatDateNoHour(item.date),
    createdAt: formatDateNoHour(item.createdAt)
  }))

  return (
    <div>
      <Card title="Borçlar">
        <Card.Container>
          {!debts ? (
            <LoadingData data={debts} />
          ) : debts?.length < 1 ? (
            <CardAlert text="borç" url="/yonetim/borcekle" />
          ) : (
            <Table
              headings={[
                'Daire No',
                'İsim Soyisim',
                'Fiyat',
                'Açıklama',
                'Tip',
                'Borç Tarihi',
                'Oluşturuldu'
              ]}
              gridCols={[
                '58px',
                '3fr',
                '1fr',
                '3fr',
                '1fr',
                '2fr',
                '2fr',
                'auto'
              ]}
              data={newData}
              mutateValues={['listDebts']}
              deleteFetchKeys={['debt', 'deleteDebt']}
            />
          )}
        </Card.Container>
      </Card>
    </div>
  )
}

export default ListDebt
