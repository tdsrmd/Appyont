import Alert from 'components/Alert'
import Card from 'components/Card'
import LoadingData from 'components/LoadingData'
import Spinner from 'components/Spinner'
import { useApartment } from 'context/ApartmentContext'
import { useDues } from 'context/DuesContext'
import { formatNumber } from 'helpers/global'
import { BsCheck2All } from 'react-icons/bs'

const Home = () => {
  const { unPaidDues, paidDues } = useDues()
  const { apartment, expenses, lastTransactions, debts } = useApartment()

  const totalExpenses = () => {
    let totalExpenses = 0
    for (let i = 0; i < expenses?.length; i++) {
      totalExpenses += expenses[i]?.amount
    }
    return `${formatNumber(totalExpenses)} TL`
  }

  const totalDebts = () => {
    let totalDebts = 0
    for (let i = 0; i < debts?.length; i++) {
      totalDebts += debts[i]?.amount
    }
    return `${formatNumber(totalDebts)} TL`
  }

  return (
    <div className="grid grid-cols-2 gap-5">
      <div className="flex flex-col gap-y-5 col-span-2 xl:col-span-1">
        <Card title="Özet" badge="Mart">
          {!unPaidDues || !paidDues || !expenses ? (
            <div className="col-span-2">
              <Spinner className="w-5 h-5" />
            </div>
          ) : (
            <>
              <Card.Item
                title="Aidat Ödemeyen Daire Sayısı"
                badge={unPaidDues?.length?.toString()}
              />
              <Card.Item
                title="Kasaya Giren Toplam Para"
                badge={`${paidDues?.length * apartment?.monthlyDuesAmount} TL`}
              />
              <Card.Item
                title="Kasadan Çıkan Toplam Para"
                badge={totalExpenses()}
              />
              <Card.Item title="Toplam Borç Tutarı" badge={totalDebts()} />
            </>
          )}
        </Card>
        <Card title="Aidat Ödemeyen Daireler" badge="Mart">
          {unPaidDues?.length < 1 && (
            <Alert color="lime">
              <BsCheck2All className="h-10 w-10" />
              Bu ay tüm daireler aidat verdi
            </Alert>
          )}
          <LoadingData data={unPaidDues} />
          <div className="col-span-2 grid grid-cols-3 gap-3">
            {unPaidDues?.map((item) => (
              <Card.Item
                title={item.flatNumber}
                badge={`${item.firstName} ${item.lastName.charAt(0)}.`}
                badgeColor="purple"
                key={item.id}
              />
            ))}
          </div>
        </Card>
      </div>

      <div className="col-span-2 xl:col-span-1">
        <Card
          title={
            <span>
              Son Hareketler
              <span className="text-sm">(Gelir - Gider)</span>
            </span>
          }
          badge="Mart"
        >
          <LoadingData data={lastTransactions} />
          {lastTransactions?.length < 1 && (
            <Alert color="lime">
              <BsCheck2All className="h-10 w-10" />
              Hareket Yok
            </Alert>
          )}
          {lastTransactions?.map((item) => (
            <Card.CaseTransaction data={item} key={item.id} />
          ))}
        </Card>
      </div>
    </div>
  )
}

export default Home
