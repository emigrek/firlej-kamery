import { FC, HTMLAttributes } from 'react'
import { TbDeviceCctvOff } from 'react-icons/tb'
import { HTMLMotionProps, motion as m } from 'framer-motion';
import cn from '@client/utils/cn';

type ImageErrorProps = HTMLAttributes<HTMLDivElement> & HTMLMotionProps<"div">;

const ImageError: FC<ImageErrorProps> = ({ className, ...props }) => {
    return (
        <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={cn("absolute inset-0 z-10 flex flex-col items-center justify-center w-full h-full overflow-hidden rounded-lg cursor-pointer bg-neutral-900 group", className)}
            {...props}
        >
            <div className='relative my-1'>
                <TbDeviceCctvOff className='w-8 h-8 text-red-500 lg:w-14 lg:h-14' />
            </div>
            <h1 className='text-sm font-bold text-neutral-100 md:text-md lg:text-xl'>
                Błąd obrazu z kamery
            </h1>
        </m.div>
    )
}

export default ImageError;