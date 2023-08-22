import { FC, HTMLAttributes } from 'react'
import { TbRefresh, TbWifiOff } from 'react-icons/tb'
import { HTMLMotionProps, motion as m } from 'framer-motion';
import cn from '@client/utils/cn';

type BoundaryErrorProps = HTMLAttributes<HTMLDivElement> & HTMLMotionProps<"div">;

const BoundaryError: FC<BoundaryErrorProps> = ({ className, ...props }) => {
    return (
        <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={cn("flex flex-col items-center justify-center w-full h-full overflow-hidden rounded-lg cursor-pointer bg-neutral-900 group", className)}
            {...props}
        >
            <div className='relative my-1'>
                <TbWifiOff className='w-8 h-8 text-red-500 group-hover:hidden lg:w-14 lg:h-14' />
                <TbRefresh className='hidden w-8 h-8 text-sky-600 group-hover:block lg:w-14 lg:h-14' />
            </div>
            <h1 className='text-sm font-bold text-neutral-100 md:text-md lg:text-xl'>
                Błąd połaczenia
            </h1>
            <p className='text-xs transition-all duration-100 border-b-2 md:text-sm text-neutral-400 border-b-transparent group-hover:border-b-2 group-hover:border-sky-600/50 group-hover:text-sky-600'>
                Kliknij aby odświeżyć
            </p>
        </m.div>
    )
}

export default BoundaryError;