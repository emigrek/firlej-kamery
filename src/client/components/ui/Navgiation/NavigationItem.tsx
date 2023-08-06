import useViewStore from '@client/stores/viewStore';
import cn from '@client/utils/cn';
import { ViewItem } from '@client/views/views'
import { FC } from 'react'
import { motion as m } from 'framer-motion';
import useCameraModalStore from '@client/stores/cameraModalStore';

type NavigationItemProps = ViewItem;

const NavigationItem: FC<NavigationItemProps> = ({ icon: Icon, label, view, newFeature }) => {
    const { view: currentView, setView } = useViewStore();
    const { setIsOpen } = useCameraModalStore();
    const active = Boolean(currentView === view);

    const handleNavgationItemClick = () => {
        setView(view);
        setIsOpen(false);
    }

    return (
        <div onClick={handleNavgationItemClick} className={
            cn("relative flex flex-col md:flex-row items-center justify-center h-16 md:gap-2 px-5 cursor-pointer transition-all duration-300 select-none",
                active ? "text-primary" : "text-neutral-400 hover:text-tulip-tree-300"
            )
        }>
            {
                active && (
                    <m.div layoutId="NavigationItemBorder" className="absolute top-0 w-full h-1 rounded-full md:top-auto md:bottom-0 bg-primary" transition={{ duration: 0.7, type: "spring", bounce: 0.4 }} />
                )
            }
            <Icon className="w-7 h-7 md:w-8 md:h-8" />
            <span className="text-xs font-semibold md:text-base">{label}</span>
            {
                newFeature && (
                    <span className="px-1 py-1 mb-2 text-xs font-bold rounded-full shadow-md animate-pulse md:py-0 text-neutral-950 bg-primary-300 shadow-primary/40">
                        <span className='hidden md:block'>Nowe</span>
                    </span>
                )
            }
        </div>
    )
}

export default NavigationItem