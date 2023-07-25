import { FC } from 'react'

import Navigation from '@/components/ui/Navgiation'
import NavigationItem from '@/components/ui/Navgiation/NavigationItem'

import { Views, views } from '@/views/views'
import useViewStore from '@/stores/viewStore'
import { useSwipeable } from 'react-swipeable'

enum Directions {
    Left = 'left',
    Right = 'right'
}

type Direction = `${Directions}`;

const Navbar: FC = () => {
    const { view, setView } = useViewStore();

    const onSwiped = (direction: Direction) => {
        const currentIndex = views.findIndex(v => v.view === view);
        const nextIndex = direction === 'left' ? currentIndex + 1 : currentIndex - 1;
        const nextView = views[nextIndex];

        setView(nextView.view);
    }

    const swipeableHandlers = useSwipeable({
        onSwipedLeft: () => onSwiped(Directions.Left),
        onSwipedRight: () => onSwiped(Directions.Right),
        preventScrollOnSwipe: true,
        trackMouse: true,
        delta: 10
    });

    return (
        <Navigation {...swipeableHandlers}>
            <img onClick={() => setView(Views.Map)} src="/logo_firlej.png" alt="Firlej Logo" className="hidden h-16 cursor-pointer md:block" />
            <div className="flex items-center justify-center gap-5 md:gap-10">
                {
                    views.map((view, index) => {
                        return (
                            <NavigationItem {...view} key={index} />
                        )
                    })
                }
            </div>
        </Navigation>
    )
}

export default Navbar