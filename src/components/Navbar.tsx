import { FC } from 'react'

import Navigation from '@/components/Navgiation'
import NavigationItem from '@/components/Navgiation/NavigationItem'

import { views } from '@/views/views'

const Navbar: FC = () => {
    return (
        <Navigation>
            <div className="flex items-center h-full px-5">
                <img src="/logo_firlej.png" alt="Firlej Logo" className="h-14" />
                <div className="flex items-center justify-center w-full">
                    {
                        views.map((view, index) => {
                            return (
                                <NavigationItem {...view} key={index} />
                            )
                        })
                    }
                </div>
            </div>
        </Navigation>
    )
}

export default Navbar