import cn from '@client/utils/cn'
import { FC, HTMLAttributes } from 'react'
import { VscLoading } from 'react-icons/vsc'

interface LoadingProps extends HTMLAttributes<HTMLDivElement> {
    iconClassName?: string
}

const Loading: FC<LoadingProps> = ({ className, iconClassName, ...props }) => {
    return (
        <div className={cn("absolute inset-0 flex items-center justify-center bg-neutral-950", className)} {...props}>
            <VscLoading className={cn("animate-spin w-6 h-6 md:w-9 md:h-9 text-white", iconClassName)} />
        </div>
    )
}

export default Loading