import cn from '@/utils/cn'
import { FC, HTMLAttributes } from 'react'
import Cell from './Cell'

type GridProps = HTMLAttributes<HTMLDivElement>

function Grid ({ className, ...props }: GridProps) {
    return (
        <div className={cn("mt-[theme(spacing.14)] w-full h-[calc(100vh-theme(spacing.14))] flex flex-wrap items-center justify-center align-middle gap-1", className)} {...props}/>
    )
}

Grid.Cell = Cell;

export default Grid;