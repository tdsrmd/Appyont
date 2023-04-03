import { useApartment } from 'context/ApartmentContext'
import { formatNumber, numberToTurkishWords } from 'helpers/global'
import { useLocation } from 'react-router-dom'
import Badge from './Badge'
import { motion, AnimatePresence } from 'framer-motion'

const Headline = () => {
  const { pathname } = useLocation()
  const { apartment } = useApartment()

  return (
    <div className="flex justify-between items-center">
      <div className="">
        <h3 className="font-semibold text-2xl xl:text-4xl xl:mb-2 mb-1">
          {pathname.startsWith('/anasayfa') && 'Anasayfa'}
          {pathname.startsWith('/isletmedefteri') && 'İşletme Defteri'}
          {pathname.startsWith('/aidat') && 'Aidat'}
          {pathname.startsWith('/yonetim') && 'Yönetim'}
          {pathname.startsWith('/ayarlar') && 'Ayarlar'}
        </h3>
        <div className="xl:mt-4">
          <Badge
            title={`${apartment?.name} Apartmanı`}
            className="font-light xl:text-base text-xs"
            color="theme"
          />
        </div>
      </div>
      <div className="font-tange text-sm col-center">
        <AnimatePresence>
          <motion.div
            initial={{ x: 300 }}
            animate={{ x: 0 }}
            exit={{ x: 300 }}
            className="py-2 px-4 bg-dgray-200 rounded-lg text-base col-center"
          >
            <div className="flex items-center gap-x-1 text-sm xl:text-base">
              <span>Kasa:</span>
              <motion.span
                key={apartment?.till}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="font-semibold text-sm"
              >
                {formatNumber(apartment?.till)} TL
              </motion.span>
            </div>
            <motion.span
              key={apartment?.till}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="capitalize text-xs"
            >
              ({numberToTurkishWords(apartment?.till)})
            </motion.span>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

export default Headline
