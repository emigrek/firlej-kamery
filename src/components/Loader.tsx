import { FC } from 'react'
import { motion as m } from 'framer-motion';

const Loader: FC = () => {
  return (
    <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{  duration: 0.3 }} className="absolute inset-0 z-10 flex items-center justify-center w-full h-full overflow-hidden rounded-lg bg-neutral-900">
      <m.div initial={{ scale: 0, rotate: 180 }} animate={{ scale: 1, opacity: 0.8, rotate: 0 }} exit={{ scale: 0, opacity: 0 }} className='relative w-24 h-24 md:w-32 md:h-32 animate-pulse'>
        <img src="/logo_firlej.png" alt="Firlej Logo" className="w-full h-full" />
      </m.div>
    </m.div>
  )
}

export default Loader;