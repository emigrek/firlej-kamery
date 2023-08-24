import { FC, HTMLAttributes } from 'react'
import { TbWifiOff } from 'react-icons/tb'
import cn from '@client/utils/cn';

interface BoundaryErrorProps extends HTMLAttributes<HTMLDivElement> {
    iconClassName?: string
}

const BoundaryError: FC<BoundaryErrorProps> = ({ className, iconClassName, ...props }) => {
    return (
        <div className={cn("absolute inset-0 flex items-center justify-center bg-neutral-900 text-white gap-3 rounded-lg", className)} {...props}>
            <TbWifiOff className={cn("w-6 h-6 md:w-9 md:h-9", iconClassName)} />
            <p className='text-neutral-300'>Błąd połaczenia</p>
        </div>
    )
}

export default BoundaryError;