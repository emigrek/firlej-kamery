import { FC } from 'react'
import { motion as m, HTMLMotionProps } from 'framer-motion';
import { HTMLAttributes } from 'react';
import Spinner from '@client/components/ui/Spinner';

type LoaderProps = HTMLAttributes<HTMLDivElement> & HTMLMotionProps<"div">;

const Loader: FC<LoaderProps> = ({ ...props }) => {
  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="absolute inset-0 z-10 flex flex-col items-center justify-center w-full h-full overflow-hidden rounded-lg bg-neutral-900"
      {...props}
    >
      <div className='relative w-16 h-16 md:w-24 md:h-24'>
        <img src="/logo_firlej.png" alt="Firlej Logo" className="w-full h-full" />
      </div>
      <Spinner className='w-4 h-4 fill-primary' />
    </m.div>
  )
}

export default Loader;