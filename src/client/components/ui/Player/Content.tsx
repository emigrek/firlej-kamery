import cn from '@client/utils/cn';
import { HTMLAttributes, FC } from 'react';
import { usePlayerContext } from './context';

interface ContentProps extends HTMLAttributes<HTMLDivElement> { }

const Content: FC<ContentProps> = ({ className, children, ...props }) => {
    const { id } = usePlayerContext();

    return (
        <div
            className={
                cn(
                    "relative group/player",
                    `player-${id}`,
                    className
                )
            }
            {...props}
        >
            {children}
        </div>
    )
}

export default Content;