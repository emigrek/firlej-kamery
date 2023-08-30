import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'
import {
    Root,
    Portal,
    Group,
    Trigger,
    RadioGroup,
    Arrow as ArrowPrimitive,
    RadioItem as RadioItemPrimitive,
    Content as ContentPrimitive,
    Item as ItemPrimitive,
    ItemIndicator as ItemIndicatorPrimitive,
    Label as LabelPrimitive
} from '@radix-ui/react-dropdown-menu';
import cn from '@client/utils/cn';

const Content = forwardRef<
    ElementRef<typeof ContentPrimitive>,
    ComponentPropsWithoutRef<typeof ContentPrimitive>
>(({ className, ...props }, ref) => {
    return (
        <ContentPrimitive
            ref={ref}
            className={cn('z-30 py-2 rounded-lg text-neutral-200 bg-neutral-900', className)}
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
            className={
                cn(
                    'flex items-center gap-2 cursor-pointer px-3 py-2 transition-all hover:bg-neutral-800',
                    'data-[disabled]:opacity-50',
                    className
                )
            }
            {...props}
        />
    )
});

const RadioItem = forwardRef<
    ElementRef<typeof RadioItemPrimitive>,
    ComponentPropsWithoutRef<typeof RadioItemPrimitive>
>(({ className, ...props }, ref) => {
    return (
        <RadioItemPrimitive
            ref={ref}
            className={
                cn(
                    'flex items-center gap-2 cursor-pointer px-3 py-2 transition-all hover:bg-neutral-800',
                    'data-[disabled]:opacity-50',
                    className
                )
            }
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
            className={cn('text-neutral-400 text-xs flex items-center gap-2 text-center px-5 py-2', className)}
            {...props}
        />
    )
});

const RightSlot = forwardRef<
    ElementRef<'div'>,
    ComponentPropsWithoutRef<'div'>
>(({ className, ...props }, ref) => {
    return (
        <div
            ref={ref}
            className={cn('ml-auto flex items-center', className)}
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
    Root,
    Content,
    Trigger,
    Item,
    Portal,
    ItemIndicator,
    Group,
    RadioGroup,
    RadioItem,
    Label,
    RightSlot,
    Arrow
};