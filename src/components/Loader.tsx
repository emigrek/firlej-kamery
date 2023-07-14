import { FC } from 'react'
import { motion as m } from 'framer-motion';

const Loader: FC = () => {
  return (
    <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-10 flex items-center justify-center w-full h-full overflow-hidden rounded-lg backdrop-blur bg-neutral-900/50">
      <m.div initial={{ scale: 0, rotate: 180 }} animate={{ scale: 1, opacity: 1, rotate: 0 }} exit={{ scale: 0, opacity: 0 }} className='relative w-20 h-20 md:w-28 md:h-28 animate-pulse'>
        <img src="/logo_firlej.png" alt="Firlej Logo" className="w-full h-full" />
      </m.div>
    </m.div>
  )
}

export default Loader;