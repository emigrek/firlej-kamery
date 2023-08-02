import { FC, HTMLAttributes } from 'react'
import Spinner from '@client/components/ui/Spinner';

type LoaderProps = HTMLAttributes<HTMLDivElement>;

const Loader: FC<LoaderProps> = ({ ...props }) => {
    return (
        <div
            className='h-[calc(100vh-theme(spacing.16))] mt-0 mb-16 md:mb-0 md:mt-16 text-white p-4 flex items-center justify-center gap-10 flex-col bg-neutral-950'
            {...props}
        >
            <Spinner className='fill-primary'/>
        </div>
    )
}

export default Loader;