import { FC } from 'react'
import { motion as m, HTMLMotionProps } from 'framer-motion';
import { HTMLAttributes } from 'react';
import cn from "@client/utils/cn";

import Spinner from '@client/components/ui/Spinner';

type LoaderProps = HTMLAttributes<HTMLDivElement> & HTMLMotionProps<"div">;

const Loader: FC<LoaderProps> = ({ ...props }) => {
  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="flex flex-col items-center justify-center w-full h-full overflow-hidden rounded-lg cursor-pointer bg-neutral-900 group"
      {...props}
    >
      <Spinner className='w-4 h-4 fill-primary' />
    </m.div>
  )
}

export default Loader;