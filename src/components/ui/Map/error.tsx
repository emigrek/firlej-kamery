import { FC, HTMLAttributes } from 'react'
import { MdWifiOff } from 'react-icons/md';

type ErrorProps = HTMLAttributes<HTMLDivElement>;

const Error: FC<ErrorProps> = ({ ...props }) => {
    return (
        <div
            className='h-[calc(100vh-theme(spacing.16))] mt-0 mb-16 md:mb-0 md:mt-16 text-white p-4 flex items-center justify-center gap-10 flex-col'
            {...props}
        >
            <MdWifiOff className='w-24 h-24 md:w-36 md:h-36' />
            <div className='flex flex-col items-center gap-1'>
                <h1 className='font-bold text-neutral-100 text-md md:text-xl'>
                    Wystąpił błąd podczas ładowania mapy.
                </h1>
                <p className='text-xs text-neutral-400 md:text-sm'>
                    Sprawdź czy masz połączenie z internetem i odśwież stronę.
                </p>
            </div>
        </div>
    )
}

export default Error;