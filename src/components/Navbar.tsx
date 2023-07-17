import { FC } from 'react'

import Navigation from '@/components/ui/Navgiation'
import NavigationItem from '@/components/ui/Navgiation/NavigationItem'

import { Views, views } from '@/views/views'
import useViewStore from '@/stores/viewStore'

const Navbar: FC = () => {
    const { view: currentView, setView } = useViewStore();

    return (
        <Navigation>
            <div className="flex items-center h-full px-5">
                <img onClick={() => setView(Views.Grid)} src="/logo_firlej.png" alt="Firlej Logo" className="cursor-pointer h-14" />
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