import { FC } from 'react'

import Navigation from '@client/components/ui/Navgiation'
import NavigationItem from '@client/components/ui/Navgiation/NavigationItem'

import { Link } from 'react-router-dom'
import { useRoutes } from '@client/hooks/useRoutes'

const Navbar: FC = () => {
    const routes = useRoutes();

    return (
        <Navigation>
            <Link to="/">
                <img src="/logo_firlej.png" alt="Firlej Logo" className="hidden h-16 cursor-pointer md:block" />
            </Link>
            <div className="flex items-center justify-center gap-5 md:gap-10">
                {
                    routes.map(({ active, view }, index) => (
                        <Link
                            key={index}
                            to={view.link}
                        >
                            <NavigationItem active={active} {...view} />
                        </Link>
                    ))
                }
            </div>
        </Navigation>
    )
}

export default Navbar