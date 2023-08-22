import { Drawer } from "vaul";
import { forwardRef, ElementRef, ComponentPropsWithoutRef, HTMLAttributes } from 'react';
import cn from "@client/utils/cn";

const {
    Portal,
    Overlay: OverlayPrimitive,
    Trigger, Title, Root, NestedRoot, Close,
    Content: ContentPrimitive,
    Description
} = Drawer;

const Overlay = forwardRef<
    ElementRef<typeof OverlayPrimitive>,
    ComponentPropsWithoutRef<typeof OverlayPrimitive>
>(({ className, ...props }, ref) => {
    return (
        <OverlayPrimitive
            ref={ref}
            className={cn("fixed inset-0 bg-neutral-950/60 backdrop-blur-sm", className)}
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
            className={cn("bg-neutral-800 flex flex-col rounded-t-3xl mt-24 fixed bottom-0 left-0 right-0 shadow-lg", className)}
            {...props}
        />
    )
});

interface GrabberProps extends HTMLAttributes<HTMLDivElement> { }

const Grabber = forwardRef<
    ElementRef<'div'>,
    GrabberProps
>(({ className, ...props }, ref) => {
    return (
        <div
            ref={ref}
            className={cn("mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-neutral-700 mb-4 md:mb-8", className)}
            {...props}
        />
    )
});

export {
    Portal, Overlay, Trigger, Title, Root, NestedRoot, Close, Content, Description, Grabber
}