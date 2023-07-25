import cn from '@/utils/cn';
import { FC, AnchorHTMLAttributes } from 'react'

type AnchorProps = AnchorHTMLAttributes<HTMLAnchorElement>;

const Anchor: FC<AnchorProps> = ({ className, ...props }) => {
    return (
        <a
            className={cn("underline text-neutral-400", className)}
            rel="noreferrer"
            {...props}
        />
    )
}

export default Anchor