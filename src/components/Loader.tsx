import { FC } from 'react'
import { motion as m } from 'framer-motion';
import { VscLoading } from 'react-icons/vsc';

const Loader: FC = () => {
  return (
    <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{  duration: 0.5 }} className="absolute inset-0 z-10 flex flex-col items-center justify-center w-full h-full overflow-hidden rounded-lg bg-neutral-950/60 backdrop-blur-xl">
      <m.div className='relative w-20 h-20 md:w-28 md:h-28'>
        <img src="/logo_firlej.png" alt="Firlej Logo" className="w-full h-full" />
      </m.div>
      <div>
        <VscLoading className='w-6 h-6 md:w-7 md:h-7 text-tulip-tree-400 animate-spin' />
      </div>
    </m.div>
  )
}

export default Loader;