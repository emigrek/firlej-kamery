import { FC } from 'react'

import Navigation from '@/components/Navgiation'

const Navbar: FC = () => {
    return (
        <Navigation size={'lg'}>
            <div className="flex items-center justify-between h-full px-4 md:px-10">
                <img src="/logo_firlej.png" alt="Firlej Logo" className="h-14" />
            </div>
        </Navigation>
    )
}

export default Navbar