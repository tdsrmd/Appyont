import Card from 'components/Card'
import CardAlert from 'components/CardAlert'
import Table from 'components/Table'
import { useApartment } from 'context/ApartmentContext'
import { formatCarPlate, formatPhoneNumber, whatRole } from 'helpers/global'

const ListResidents = () => {
  const { residents } = useApartment()

  const newData = residents?.map(
    ({ id, flatNumber, firstName, lastName, phone, carPlate, role }) => {
      const formattedPhone = formatPhoneNumber(phone)
      const formattedCarPlate = formatCarPlate(carPlate)
      return {
        id,
        flatNumber: (
          <div className="text-center font-semibold">{flatNumber}</div>
        ),
        nameSurname: (
          <div className="capitalize">
            {firstName} {lastName}
          </div>
        ),
        phone: <div className="col-center">{formattedPhone}</div>,
        carPlate: (
          <div className="text-center">
            {carPlate ? formattedCarPlate : '-'}
          </div>
        ),
        role: whatRole(role)
      }
    }
  )

  return (
    <div>
      <Card title="Daireler">
        <Card.Container>
          {residents?.length < 1 ? (
            <CardAlert text="daire" url="/yonetim/daireekle" />
          ) : (
            <Table
              headings={[
                <div className="text-center">Daire No</div>,
                'İsim Soyisim',
                <div className="text-center">Telefon Num.</div>,
                <div className="text-center">Araç Plakası</div>,
                ''
              ]}
              gridCols={['58px', '3fr', '2fr', '2fr', '1fr', 'auto']}
              data={newData}
              mutateValues={['listResidents', 'listDues']}
              deleteFetchKeys={['resident', 'deleteResident']}
            />
          )}
        </Card.Container>
      </Card>
    </div>
  )
}

export default ListResidents
