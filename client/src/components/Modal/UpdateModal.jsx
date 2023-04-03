import { Button } from 'components/Form'
import { useClickOutside } from 'hooks/clickOutSide'
import { useRef } from 'react'

const UpdateResidentModal = (props) => {
  const { onCancel, onOk, loading } = props
  const ref = useRef()
  useClickOutside(ref, onCancel)

  return (
    <div className="fixed w-full h-screen top-0 left-0 bg-black/20 z-10">
      <div className="col-center h-full">
        <div ref={ref} className="bg-white p-8 w-[400px] rounded-3xl">
          <h3 className="text-lg leading-6 font-semibold text-gray-900 mb-4">
            Silinsin mi?
          </h3>
          <p className="text-gray-500">
            Bu işlem geri alınamaz. Veri her yerden kaldırılacak.
          </p>
          <div className="flex flex-col gap-y-2 mt-5">
            <Button
              text="Sil"
              color="red"
              className="h-14 col-center text-base rounded-full bg-red-500"
              onClick={onOk}
              disabled={loading}
              loading={loading}
            />
            <Button
              text="Vazgeç"
              color="gray"
              className="h-14 col-center text-base rounded-full"
              onClick={onCancel}
              disabled={loading}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default UpdateResidentModal
