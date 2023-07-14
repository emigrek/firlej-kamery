import cn from '@/utils/cn';
import { FC, HTMLAttributes } from 'react'

type CellProps = HTMLAttributes<HTMLDivElement>;

const Cell: FC<CellProps> = ({ className, ...props }) => {
    return (
        <div className={cn("w-auto h-[calc((100vh-theme(spacing.14)-3*theme(spacing.1))/4)] md:h-[calc((100vh-theme(spacing.14)-theme(spacing.1))/2)]", className)} {...props}/>
    )
}

export default Cell