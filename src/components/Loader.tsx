import { FC } from 'react'
import { motion as m, HTMLMotionProps } from 'framer-motion';
import { HTMLAttributes } from 'react';
import Spinner from '@/components/ui/Spinner';

type LoaderProps = HTMLAttributes<HTMLDivElement> & HTMLMotionProps<"div">;

const Loader: FC<LoaderProps> = ({ ...props }) => {
  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="absolute inset-0 z-10 flex flex-col items-center justify-center w-full h-full overflow-hidden rounded-lg bg-neutral-900/60 backdrop-blur-xl"
      {...props}
    >
      <div className='relative w-20 h-20 md:w-28 md:h-28'>
        <img src="/logo_firlej.png" alt="Firlej Logo" className="w-full h-full" />
      </div>
      <Spinner className='fill-tulip-tree-400' />
    </m.div>
  )
}

export default Loader;