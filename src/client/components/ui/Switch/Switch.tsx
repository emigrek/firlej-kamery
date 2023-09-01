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
                    'relative rounded-full w-10 h-5 bg-neutral-700',
                    'transition-colors data-[state="checked"]:bg-primary-500',
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
                    'block w-5 h-5 bg-neutral-200 rounded-full shadow-xl ring-2 ring-neutral-200',
                    'transition-transform data-[state="checked"]:translate-x-5',
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