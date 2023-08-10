import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'
import {
    Root as RootPrimitive,
    Track as TrackPrimitive,
    Range as RangePrimitive,
    Thumb as ThumbPrimitive
} from '@radix-ui/react-slider';
import cn from '@client/utils/cn';

const Root = forwardRef<
    ElementRef<typeof RootPrimitive>, ComponentPropsWithoutRef<typeof RootPrimitive>
>(({ className, ...props }, ref) => {
    return (
        <RootPrimitive
            ref={ref}
            className={cn('relative group/progress flex items-center w-full h-3 px-3 cursor-pointer select-none touch-none', className)}
            {...props}
        />
    )
});

const Track = forwardRef<
    ElementRef<typeof TrackPrimitive>,
    ComponentPropsWithoutRef<typeof TrackPrimitive>
>(({ className, ...props }, ref) => {
    return (
        <TrackPrimitive
            ref={ref}
            className={cn('relative transition-all duration-200 h-[2px] group-hover/progress:h-1 rounded-full grow bg-neutral-500/40', className)}
            {...props}
        />
    )
});

const Range = forwardRef<
    ElementRef<typeof RangePrimitive>,
    ComponentPropsWithoutRef<typeof RangePrimitive>
>(({ className, ...props }, ref) => {
    return (
        <RangePrimitive
            ref={ref}
            className={cn('absolute h-full rounded-full bg-primary-400/80', className)}
            {...props}
        />
    )
});

const Thumb = forwardRef<
    ElementRef<typeof ThumbPrimitive>,
    ComponentPropsWithoutRef<typeof ThumbPrimitive>
>(({ className, ...props }, ref) => {
    return (
        <ThumbPrimitive
            ref={ref}
            className={cn('block transition-all duration-75 w-0 h-0 group-hover/progress:w-3 group-hover/progress:h-3 rounded-full bg-primary-400 focus:w-3 focus:h-3 focus:outline-none focus:shadow-[0_0_0_8px] focus:shadow-neutral-300/20', className)}
            {...props}
        />
    )
});

export {
    Root,
    Track,
    Range,
    Thumb
}

