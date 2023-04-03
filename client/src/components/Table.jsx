import requests from 'api'
import React from 'react'
import { toast } from 'react-toastify'
import { mutate } from 'swr'
import { Button } from './Form'
import LoadingData from './LoadingData'
import ToastAlert from './ToastAlert'
import { AiFillCheckCircle } from 'react-icons/ai'
import UpdateModal from './Modal/UpdateModal'
import BasicModal from './Modal/BasicModal'

const Table = ({
  headings,
  data,
  gridCols,
  mutateValues,
  deleteFetchKeys,
  actions = true
}) => {
  const gridColsArray = React.useMemo(
    () =>
      gridCols.reduce((acc, cur) => {
        return `${acc} ${cur}`
      }),
    [gridCols]
  )

  return (
    <div>
      <div
        className="grid gap-x-5 text-[#05445E] font-semibold rounded-lg mb-2 pl-4 pr-2 text-sm items-center"
        style={{ gridTemplateColumns: gridColsArray }}
      >
        {headings.map((heading, i) => (
          <div key={i}>{heading}</div>
        ))}
        {actions && (
          <div className="opacity-0 flex gap-x-2 select-none">
            {/* <Button text="Düzenle" className="cursor-default" /> */}
            <Button text="Sil" className="cursor-default" />
          </div>
        )}
      </div>
      <LoadingData data={data} />
      {data?.map((item, i) => (
        <Item
          item={item}
          gridColsArray={gridColsArray}
          mutateValues={mutateValues}
          deleteFetchKeys={deleteFetchKeys}
          key={i}
          actions={actions}
        />
      ))}
    </div>
  )
}

const Item = ({
  item,
  gridColsArray,
  mutateValues,
  deleteFetchKeys,
  actions = true
}) => {
  const [loading, setLoading] = React.useState(false)
  const [deleteModal, setDeleteModal] = React.useState(false)
  const [updateModal, setUpdateModal] = React.useState(false)

  const handleDelete = async (id) => {
    try {
      setLoading(true)
      await requests[deleteFetchKeys[0]][deleteFetchKeys[1]](id)
      mutateValues.map((m) => mutate(m))
      toast(
        <ToastAlert text="Başarılı bir şekilde silindi.">
          <AiFillCheckCircle className="w-6 h-6 text-[#3ec786]" />
        </ToastAlert>
      )
    } catch (error) {
      toast.error('Bir hata oluştu.')
      console.log(error)
    } finally {
      setLoading(false)
      setDeleteModal(false)
    }
  }

  return (
    <div
      className="grid gap-x-5 bg-sgray-100 rounded-lg mb-2 pl-4 pr-2 py-2 text-sm items-center"
      style={{ gridTemplateColumns: gridColsArray }}
    >
      {deleteModal && (
        <BasicModal
          title="Silinsin mi?"
          text="Bu işlem geri alınamaz. Veri her yerden kaldırılacak."
          loading={loading}
          onCancel={() => setDeleteModal(false)}
          onOk={() => handleDelete(item.id)}
          okButtonText="Sil"
        />
      )}
      {updateModal && (
        <UpdateModal data={item} onCancel={() => setUpdateModal(false)} />
      )}

      {Object.entries(item)?.map(([key, value]) => {
        if (key === 'id') return null
        return <div key={key}>{value}</div>
      })}
      {actions && (
        <div className="place-self-end flex gap-x-2">
          {/* <Button text="Düzenle" color="gray" onClick={() => setUpdateModal(true)} /> */}
          <Button
            text="Sil"
            color="red"
            onClick={() => setDeleteModal(true)}
            disabled={loading}
            loading={loading}
            spinnerColor="black"
          />
        </div>
      )}
    </div>
  )
}
export default Table
