import { useApartment } from 'context/ApartmentContext'
import { formatDate, formatNumber, whatType } from 'helpers/global'
import { useState } from 'react'
import Badge from './Badge'
import { motion } from 'framer-motion'

const Card = (props) => {
  const { title, badge, children } = props
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.75 }}
      className="bg-dgray-200 rounded-lg p-5"
    >
      {(title || badge) && (
        <div className="flex justify-between items-center h-12">
          <h3 className="text-2xl font-light">{title}</h3>
          {badge && (
            <div className="bg-sblack rounded-full h-12 w-12 row-center ring-4 ring-white">
              <span className="text-white text-center text-sm">{badge}</span>
            </div>
          )}
        </div>
      )}
      <div className="grid grid-cols-2 gap-3 mt-5">{children}</div>
    </motion.div>
  )
}
const Container = (props) => {
  return <div className="bg-white col-span-2 rounded-lg p-5">{props.children}</div>
}

const Item = (props) => {
  const { title, badge, badgeColor = 'theme' } = props
  return (
    <motion.div transition={{ duration: 0.75 }} layout className="bg-white rounded-lg p-5">
      <div className="font-medium h-full flex flex-col gap-y-3 items-center justify-between">
        <div className="text-center"> {title}</div>
        {badge && <Badge color={badgeColor} title={badge} />}
      </div>
    </motion.div>
  )
}

const Payment = (props) => {
  const { income, expense, data } = props
  const [infoBadgeColor] = useState(income ? 'dgreen' : expense && 'pink')
  const date = formatDate(data?.createdAt).split(' ')
  const { apartment } = useApartment()
  return (
    <div className="bg-white rounded-lg py-4 px-3 col-span-2">
      <div className="flex gap-x-3">
        <div className="col-center border-r border-sgray-400 pr-4">
          <span className="text-2xl">{date[0]}</span>
          <span className="text-sgray-400 text-xs uppercase">{date[1]}</span>
          <span className="text-sgray-400 text-xs">{date[3]}</span>
        </div>
        <div className="flex flex-col justify-center w-full">
          <div className="flex justify-between items-center">
            <div className="flex flex-col gap-y-2">
              <div className="">{data.description ? data.description : 'Aidat Ödendi'}</div>
              {income ? (
                <div className="flex items-center gap-x-1">
                  <Badge title={`Daire:${data?.flatNumber}`} className="text-xs" color="yellow" />
                  <Badge title={`${data?.firstName} ${data?.lastName.charAt(0)}.`} className="text-xs" color="yellow" />
                </div>
              ) : (
                <Badge title={`Tip: ${whatType(data?.type)}`} className="text-xs" color="yellow" />
              )}
            </div>
            <Badge
              title={data.amount ? `${data.amount} TL` : `${apartment.monthlyDuesAmount} TL`}
              color={infoBadgeColor}
              className="font-medium text-center text-sm"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

const CaseTransaction = ({ data }) => {
  const date = formatDate(data?.createdAt).split(' ')
  return (
    <div className="bg-white rounded-lg p-5 col-span-2">
      <div className="flex gap-x-5">
        <div className="col-center border-r border-sgray-400 pr-4">
          <span className="text-4xl">{date[0]}</span>
          <span className="text-sgray-400 text-sm">{date[1]}</span>
          <span className="text-sgray-400 text-sm">{date[3]}</span>
        </div>
        <div className="flex flex-col justify-between w-full">
          <div className="flex justify-between items-center">
            <div className="">{data.description ? data.description : 'Aidat Ödedi'}</div>

            <Badge
              title={`${formatNumber(data.amount)} TL`}
              color="gray"
              className="font-medium min-w-[100px] text-center"
            />
          </div>
          <div className="text-sm">
            {data.resident ? (
              <div className="flex gap-x-2">
                <Badge
                  title={
                    <span>
                      Daire No: <span className="font-medium">{data?.resident?.flatNumber}</span>
                    </span>
                  }
                  color="theme"
                />
                <Badge title={`${data?.resident?.firstName} ${data?.resident?.lastName}`} color="purple" />
              </div>
            ) : (
              <div className="flex gap-x-2">
                <Badge
                  title={
                    <span>
                      Tip: <span className="font-medium">{whatType(data.type)}</span>
                    </span>
                  }
                  color="theme"
                />
                <Badge title="Gider" color="pink" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

const Arrears = ({ data }) => {
  return (
    <div className="bg-white rounded-lg py-4 px-3 col-span-2">
      <div className="flex gap-x-3">
        <div className="flex flex-col justify-center w-full">
          <div className="flex justify-between items-center">
            <div className="flex flex-col gap-y-2">
              <div className="flex items-center gap-x-3">
                {data.nameSurname} <span className="text-gray-300 text-xs">•</span> Daire:{data.flatNumber}
              </div>
              <div>
                <Badge title={data.description} className="text-xs" color="yellow" />
              </div>
            </div>
            <Badge title={`${data.amount} TL`} color="gray" className="font-medium text-center text-sm" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card

Card.Item = Item
Card.Container = Container
Card.CaseTransaction = CaseTransaction
Card.Payment = Payment
Card.Arrears = Arrears
