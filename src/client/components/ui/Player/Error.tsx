import cn from '@client/utils/cn'
import { FC, HTMLAttributes } from 'react'
import { MdError, MdErrorOutline } from 'react-icons/md'

interface ErrorProps extends HTMLAttributes<HTMLDivElement> {
    iconClassName?: string
}

const Error: FC<ErrorProps> = ({ className, iconClassName, ...props }) => {
    return (
        <div className={cn("absolute inset-0 flex items-center justify-center bg-neutral-950 text-white gap-3", className)} {...props}>
            <MdErrorOutline className={cn("w-6 h-6 md:w-9 md:h-9", iconClassName)} />
            <p>Couldn&apos;t load image</p>
        </div>
    )
}

export default Error