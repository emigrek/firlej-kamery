import cn from '@client/utils/cn';
import { ViewItem } from '@client/views/views'
import { FC } from 'react'
import { motion as m } from 'framer-motion';

type NavigationItemProps = ViewItem & {
    active?: boolean
};

const NavigationItem: FC<NavigationItemProps> = ({ icon: Icon, label, active }) => {
    return (
        <div
            className={
                cn("relative flex flex-col md:flex-row items-center justify-center h-16 md:gap-2 px-4 md:px-5 cursor-pointer transition-all duration-300 select-none",
                    active ? "text-primary" : "text-neutral-400 hover:text-tulip-tree-300"
                )
            }
        >
            {
                active && (
                    <m.div layoutId="NavigationItemBorder" className="absolute top-0 w-full h-1 rounded-full md:top-auto md:bottom-0 bg-primary" transition={{ duration: 0.7, type: "spring", bounce: 0.4 }} />
                )
            }
            <Icon className="w-7 h-7 md:w-8 md:h-8" />
            <span className="text-xs font-semibold md:text-base">{label}</span>
        </div>
    )
}

export default NavigationItem