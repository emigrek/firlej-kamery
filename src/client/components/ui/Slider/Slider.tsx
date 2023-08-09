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
            className={cn('relative flex items-center w-full h-5 cursor-pointer select-none touch-none', className)}
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
            className={cn('relative h-2 rounded-full grow bg-neutral-500/20', className)}
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
            className={cn('absolute h-full rounded-full bg-primary-500/20', className)}
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
            className={cn('block w-5 h-5 rounded-full bg-primary-400 focus:outline-none focus:shadow-[0_0_0_8px] focus:shadow-neutral-300/20', className)}
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

