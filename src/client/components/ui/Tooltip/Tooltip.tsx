import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'
import {
    Provider,
    Root,
    Trigger,
    Portal,
    Content as ContentPrimitive,
    Arrow as ArrowPrimitive
} from '@radix-ui/react-tooltip';
import cn from '@client/utils/cn';

const Content = forwardRef<
    ElementRef<typeof ContentPrimitive>,
    ComponentPropsWithoutRef<typeof ContentPrimitive>
>(({ className, ...props }, ref) => {
    return (
        <ContentPrimitive
            ref={ref}
            className={cn('p-1 rounded bg-neutral-900', className)}
            {...props}
        />
    )
});

const Arrow = forwardRef<
    ElementRef<typeof ArrowPrimitive>,
    ComponentPropsWithoutRef<typeof ArrowPrimitive>
>(({ className, ...props }, ref) => {
    return (
        <ArrowPrimitive
            ref={ref}
            className={cn('fill-neutral-900', className)}
            {...props}
        />
    )
});

export {
    Provider,
    Root,
    Trigger,
    Content,
    Arrow,
    Portal
}