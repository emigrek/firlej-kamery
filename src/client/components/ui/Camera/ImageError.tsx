import { FC, HTMLAttributes } from 'react'
import { TbDeviceCctvOff } from 'react-icons/tb'
import cn from '@client/utils/cn';

interface ErrorProps extends HTMLAttributes<HTMLDivElement> {
    iconClassName?: string
}

const ImageError: FC<ErrorProps> = ({ className, iconClassName, ...props }) => {
    return (
        <div className={cn("absolute inset-0 flex items-center justify-center bg-neutral-900 text-white gap-3", className)} {...props}>
            <TbDeviceCctvOff className={cn("w-6 h-6 md:w-9 md:h-9", iconClassName)} />
            <p className='text-neutral-300'>Nie można załadować obrazu</p>
        </div>
    )
}

export default ImageError