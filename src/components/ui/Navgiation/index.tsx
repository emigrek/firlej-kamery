import { FC, HTMLAttributes, forwardRef } from 'react'
import { cva } from 'class-variance-authority';
import { VariantProps } from 'class-variance-authority';
import cn from '@/utils/cn';

const navigationVariants = cva(
    "w-full fixed bottom-0 md:top-0 left-0 right-0 z-20 h-16 shadow-md",
    {
        variants: {
            variant: {
                dark: "bg-neutral-950 md:bg-neutral-950/80 md:backdrop-blur-sm text-neutral-200 rounded-t-3xl md:rounded-none md:border-b-2 md:border-b-neutral-800/80 md:border-t-none border-t-neutral-800/80 border-t-2"
            }
        },
        defaultVariants: {
            variant: "dark"
        }
    }
);

interface NavigationProps extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof navigationVariants> { }

const Navigation: FC<NavigationProps> = forwardRef<HTMLDivElement, NavigationProps>(({ className, variant, children, ...props }, ref) => {
    return (
        <nav
            ref={ref}
            className={cn(
                navigationVariants({ className, variant })
            )}
            {...props}
        >
            {children}
        </nav>
    );
});

export default Navigation;