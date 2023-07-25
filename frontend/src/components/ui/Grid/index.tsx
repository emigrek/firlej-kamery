import cn from '@/utils/cn'
import { HTMLAttributes } from 'react'
import Cell from './Cell'

type GridProps = HTMLAttributes<HTMLDivElement>

function Grid ({ className, ...props }: GridProps) {
    return (
        <div className={cn("md:mb-0 md:mt-[theme(spacing.16)] w-full h-[calc(100vh-theme(spacing.16)-theme(spacing.1))] flex flex-wrap items-center justify-center align-middle gap-1", className)} {...props}/>
    )
}

Grid.Cell = Cell;

export default Grid;