import useViewStore from '@/stores/viewStore';
import cn from '@/utils/cn';
import { ViewItem } from '@/views/views'
import { FC } from 'react'
import { motion as m } from 'framer-motion';
import useCameraModalStore from '@/stores/cameraModalStore';

type NavigationItemProps = ViewItem;

const NavigationItem: FC<NavigationItemProps> = ({ icon: Icon, label, view, newFeature }) => {
    const { view: currentView, setView } = useViewStore();
    const { setIsOpen } = useCameraModalStore();

    const handleNavgationItemClick = () => {
        setView(view);
        setIsOpen(false);
    }

    return (
        <m.div onClick={handleNavgationItemClick} className={
            cn("relative flex items-center justify-center h-16 gap-2 px-4 cursor-pointer md:px-10 transition-all duration-300 select-none",
                currentView === view ? "text-tulip-tree-400" : "text-neutral-600 hover:text-tulip-tree-300"
            )
        }>
            {
                currentView === view && (
                    <m.div layoutId="NavigationItem" className="absolute top-0 w-full h-1 rounded-full md:top-auto md:bottom-0 bg-tulip-tree-400" transition={{ duration: 0.7, type: "spring", bounce: 0.4 }} />
                )
            }
            <Icon className="w-9 h-9 md:w-8 md:h-8" />
            <span className="hidden font-semibold md:block">{label}</span>
            {newFeature && <span className="px-1 py-1 mb-2 text-xs font-bold rounded-full shadow-md animate-pulse md:py-0 text-neutral-950 bg-tulip-tree-300 shadow-tulip-tree-400/40">
                <span className='hidden md:block'>Nowe</span>
            </span>}
        </m.div>
    )
}

export default NavigationItem