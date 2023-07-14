import { FC } from 'react'
import { TbDeviceCctvOff, TbRefresh } from 'react-icons/tb'
import { motion as m } from 'framer-motion';

const Error: FC = () => {
    return (
        <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-40 flex flex-col items-center justify-center w-full h-full overflow-hidden rounded-lg backdrop-blur bg-neutral-900 group">
            <div className='relative my-1'>
                <TbDeviceCctvOff className='w-8 h-8 text-red-500 group-hover:hidden lg:w-14 lg:h-14' />
                <TbRefresh className='hidden w-8 h-8 text-sky-600 group-hover:block lg:w-14 lg:h-14' />
            </div>
            <h1 className='font-bold text-neutral-100 text-md md:text-xl'>
                Brak obrazu z kamery
            </h1>
            <p className='text-xs transition-all duration-100 border-b-2 md:text-sm text-neutral-400 border-b-transparent group-hover:border-b-2 group-hover:border-sky-600/50 group-hover:text-sky-600'>
                Kliknij aby odświeżyć
            </p>
        </m.div>
    )
}

export default Error;