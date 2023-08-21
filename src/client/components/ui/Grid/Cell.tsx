import cn from '@client/utils/cn';
import { FC, HTMLAttributes } from 'react'

type CellProps = HTMLAttributes<HTMLDivElement>;

const Cell: FC<CellProps> = ({ className, ...props }) => {
    return (
        <div className={cn("h-[calc((100dvh-theme(spacing.16)-3*theme(spacing.1))/4)] md:h-[calc((100dvh-theme(spacing.16)-theme(spacing.1))/2)] aspect-video", className)} {...props}/>
    )
}

export default Cell