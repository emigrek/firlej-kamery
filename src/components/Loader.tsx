import { FC } from 'react'

const Loader: FC = () => {
  return (
    <div className="absolute inset-0 z-40 flex items-center justify-center w-full h-full overflow-hidden rounded-lg backdrop-blur bg-neutral-900/80">
        <div className='relative w-20 h-20 opacity-50 md:w-28 md:h-28 animate-pulse'>
            <img src="/logo_firlej.png" alt="Firlej Logo" className="w-full h-full" />
        </div>
    </div>
 )
}

export default Loader