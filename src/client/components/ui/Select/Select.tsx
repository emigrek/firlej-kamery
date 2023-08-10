import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'
import {
    Root,
    Value,
    Portal,
    Viewport,
    ItemText,
    Group,
    Trigger as TriggerPrimitive,
    Icon as IconPrimitive,
    Content as ContentPrimitive,
    Item as ItemPrimitive,
    ItemIndicator as ItemIndicatorPrimitive,
    Label as LabelPrimitive
} from '@radix-ui/react-select';
import cn from '@client/utils/cn';

const Trigger = forwardRef<
    ElementRef<typeof TriggerPrimitive>,
    ComponentPropsWithoutRef<typeof TriggerPrimitive>
>(({ className, ...props }, ref) => {
    return (
        <TriggerPrimitive
            ref={ref}
            className={cn('flex items-center h-12 text-base gap-2 px-4 transition duration-200 ease-in-out rounded-lg text-neutral-200 bg-transparent hover:bg-neutral-300/20 focus:ring-2 focus:ring-neutral-300/20', className)}
            {...props}
        />
    )
});

const Icon = forwardRef<
    ElementRef<typeof IconPrimitive>,
    ComponentPropsWithoutRef<typeof IconPrimitive>
>(({ className, ...props }, ref) => {
    return (
        <IconPrimitive
            ref={ref}
            className={cn('fill-neutral-200', className)}
            {...props}
        />
    )
});

const Content = forwardRef<
    ElementRef<typeof ContentPrimitive>,
    ComponentPropsWithoutRef<typeof ContentPrimitive>
>(({ className, ...props }, ref) => {
    return (
        <ContentPrimitive
            ref={ref}
            className={cn('z-30 py-2 rounded-lg text-neutral-200 bg-neutral-800', className)}
            {...props}
        />
    )
});

const Item = forwardRef<
    ElementRef<typeof ItemPrimitive>,
    ComponentPropsWithoutRef<typeof ItemPrimitive>
>(({ className, ...props }, ref) => {
    return (
        <ItemPrimitive
            ref={ref}
            className={cn('flex items-center gap-2 cursor-pointer px-3 py-2 transition-all hover:bg-neutral-700', className)}
            {...props}
        />
    )
});

const ItemIndicator = forwardRef<
    ElementRef<typeof ItemIndicatorPrimitive>,
    ComponentPropsWithoutRef<typeof ItemIndicatorPrimitive>
>(({ className, ...props }, ref) => {
    return (
        <ItemIndicatorPrimitive
            ref={ref}
            className={cn('fill-neutral-200', className)}
            {...props}
        />
    )
});

const Label = forwardRef<
    ElementRef<typeof LabelPrimitive>,
    ComponentPropsWithoutRef<typeof LabelPrimitive>
>(({ className, ...props }, ref) => {
    return (
        <LabelPrimitive
            ref={ref}
            className={cn('text-neutral-400 text-xs px-5 py-2', className)}
            {...props}
        />
    )
});

export {
    Root,
    Trigger,
    Icon,
    Content,
    Item,
    Value,
    Portal,
    Viewport,
    ItemText,
    ItemIndicator,
    Group,
    Label
};