import { ComponentPropsWithoutRef, ElementRef, forwardRef, CSSProperties } from 'react'
import {
    Root,
    Trigger,
    Portal,
    Overlay as OverlayPrimitive,
    Content as ContentPrimitive,
    Title as TitlePrimitive,
    Description as DescriptionPrimitive,
    Close as ClosePrimitive
} from '@radix-ui/react-dialog';
import cn from '@client/utils/cn';
import { motion as m } from 'framer-motion';

const Overlay = forwardRef<
    ElementRef<typeof OverlayPrimitive>,
    ComponentPropsWithoutRef<typeof OverlayPrimitive>
>(({ className, children, ...props }, ref) => {
    return (
        <OverlayPrimitive
            ref={ref}
            className={cn('fixed inset-0 z-10 bg-neutral-950', className)}
            asChild
            {...props}
        >
            <m.div
                variants={{
                    closed: {
                        opacity: '0%'
                        
                    },
                    open: {
                        opacity: '80%'
                    }
                }}
                initial='closed'
                animate='open'
                exit='closed'
                transition={{ duration: 0.4 }}
            >
                {children}
            </m.div>
        </OverlayPrimitive>
    )
});

const Content = forwardRef<
    ElementRef<typeof ContentPrimitive>,
    ComponentPropsWithoutRef<typeof ContentPrimitive>
>(({ className, children, ...props }, ref) => {
    return (
        <ContentPrimitive
            ref={ref}
            className={cn('z-20 fixed bottom-0 bg-neutral-800 rounded-t-3xl pt-2 pb-10 md:bottom-auto md:py-0 md:rounded-none md:bg-transparent md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2', className)}
            asChild
            {...props}
        >
            <m.div
                variants={{
                    closed: { 
                        x: 'var(--x-from)',
                        y: 'var(--y-from)',
                        scale: 'var(--scale-from)',
                        opacity: 'var(--opacity-from)',
                    },
                    open: { 
                        x: 'var(--x-to)',
                        y: 'var(--y-to)',
                        scale: 'var(--scale-to)',
                        opacity: 'var(--opacity-to)',
                    }
                }}
                initial='closed'
                animate='open'
                exit='closed'
                transition={{ duration: 0.5, type: 'spring', bounce: 0.2 }}
                className={cn([
                    "[--y-from:20%] [--y-to:0%] md:[--y-from:-50%] md:[--y-to:-50%]",
                    "[--x-from:0%] [--x-to:0%] md:[--x-from:-50%] md:[--x-to:-50%]",
                    "[--scale-from:100%] [--scale-to:100%] md:[--scale-from:90%] md:[--scale-to:100%]",
                    "md:[--opacity-from:0%] md:[--opacity-to:100%]",
                    "flex flex-col gap-2"
                ])}
            >
                {children}
            </m.div>
        </ContentPrimitive>
    )
});

const Title = forwardRef<
    ElementRef<typeof TitlePrimitive>,
    ComponentPropsWithoutRef<typeof TitlePrimitive>
>(({ className, ...props }, ref) => {
    return (
        <TitlePrimitive
            ref={ref}
            className={cn('text-xl font-bold text-neutral-100', className)}
            {...props}
        />
    )
});

const Description = forwardRef<
    ElementRef<typeof DescriptionPrimitive>,
    ComponentPropsWithoutRef<typeof DescriptionPrimitive>
>(({ className, ...props }, ref) => {
    return (
        <DescriptionPrimitive
            ref={ref}
            className={cn('text-sm text-neutral-200', className)}
            {...props}
        />
    )
});

const Close = forwardRef<
    ElementRef<typeof ClosePrimitive>,
    ComponentPropsWithoutRef<typeof ClosePrimitive>
>(({ className, ...props }, ref) => {
    return (
        <ClosePrimitive
            ref={ref}
            className={cn('absolute top-4 right-4 w-6 h-6 text-neutral-100', className)}
            {...props}
        />
    )
});

export {
    Root,
    Trigger,
    Portal,
    Content,
    Overlay,
    Title,
    Description,
    Close
};