import { FC, HTMLAttributes } from 'react'
import cn from '@client/utils/cn'

interface ViewProps extends HTMLAttributes<HTMLDivElement> {}

const View: FC<ViewProps> = ({ className, ...props }) => {
    return (
        <div
            className={cn('h-[calc(100vh-theme(spacing.16))] mt-0 mb-[theme(spacing.16)] md:mb-0 md:mt-[theme(spacing.16)]', className)}
            {...props}
        />
    )
}

export default View