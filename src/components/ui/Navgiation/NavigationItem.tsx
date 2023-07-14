import useViewStore from '@/stores/viewStore';
import cn from '@/utils/cn';
import { ViewItem } from '@/views/views'
import { FC } from 'react'

type NavigationItemProps = ViewItem;

const NavigationItem: FC<NavigationItemProps> = ({ icon: Icon, label, view, newFeature }) => {
    const { view: currentView, setView } = useViewStore();

    const handleNavgationItemClick = () => {
        setView(view);
    }

    return (
        <div onClick={handleNavgationItemClick} className={
            cn("flex items-center justify-center h-full gap-2 px-4 cursor-pointer md:px-10 transition-all duration-300 select-none",
                currentView === view ? "text-tulip-tree-400" : "text-neutral-600 hover:text-tulip-tree-300"
            )
        }>
            <Icon className="w-9 h-9 md:w-8 md:h-8" />
            <span className="font-semibold">{label}</span>
            {newFeature && <span className="px-1 mb-2 text-xs font-bold rounded-full shadow-md text-neutral-950 bg-tulip-tree-300 shadow-tulip-tree-400/40">
                Nowe    
            </span>}
        </div>
    )
}

export default NavigationItem