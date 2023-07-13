import useViewStore from '@/stores/viewStore';
import cn from '@/utils/cn';
import { ViewItem } from '@/views/views'
import { FC } from 'react'

type NavigationItemProps = ViewItem;

const NavigationItem: FC<NavigationItemProps> = ({ icon: Icon, label, view }) => {
    const { view: currentView, setView } = useViewStore();

    const handleNavgationItemClick = () => {
        setView(view);
    }

    return (
        <div onClick={handleNavgationItemClick} className={
            cn("flex items-center justify-center h-full gap-2 px-4 cursor-pointer md:px-10 transition-all duration-300 select-none",
                currentView === view ? "text-neutral-100" : "text-neutral-600 hover:text-neutral-200"
            )
        }>
            <Icon className="w-6 h-6" />
            <span className='text-sm font-semibold'>{label}</span>
        </div>
    )
}

export default NavigationItem