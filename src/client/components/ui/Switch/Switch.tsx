import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'
import {
    Root as RootPrimitive,
    Thumb as ThumbPrimitive
} from '@radix-ui/react-switch';
import cn from '@client/utils/cn';

const Root = forwardRef<
    ElementRef<typeof RootPrimitive>,
    ComponentPropsWithoutRef<typeof RootPrimitive>
>(({ className, ...props }, ref) => {
    return (
        <RootPrimitive
            ref={ref}
            className={
                cn(
                    'relative rounded-full w-9 h-5 bg-transparent border-2 border-neutral-300 hover:border-neutral-100',
                    'transition-colors data-[state="checked"]:border-primary-500',
                    className
                )
            }
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
            className={
                cn(
                    'block w-3 h-3 bg-neutral-100 rounded-full mx-1',
                    'transition-transform data-[state="checked"]:translate-x-3',
                    'data-[state="checked"]:bg-primary-500',
                    className
                )
            }
            {...props}
        />
    )
});

export {
    Root,
    Thumb
}