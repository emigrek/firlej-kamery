import cn from '@/utils/cn';
import { FC, HTMLAttributes } from 'react'

type CellProps = HTMLAttributes<HTMLDivElement>;

const Cell: FC<CellProps> = ({ className, ...props }) => {
    return (
        <div className={cn("w-full h-[calc((100vh-theme(spacing.14)-3*theme(spacing.1))/4)] md:w-[calc((100vw-theme(spacing.1))/2)] md:h-[calc((100vh-theme(spacing.14)-theme(spacing.1))/2)] aspect-video", className)} {...props}/>
    )
}

export default Cell