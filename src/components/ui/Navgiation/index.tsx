import { FC, HTMLAttributes, forwardRef } from 'react'
import { cva } from 'class-variance-authority';
import { VariantProps } from 'class-variance-authority';
import cn from '@/utils/cn';

const navigationVariants = cva(
    "w-full sticky absolute top-0 left-0 right-0 z-10 h-14 shadow-md",
    {
        variants: {
            variant: {
                dark: "bg-neutral-950/80 backdrop-blur-sm text-neutral-200"
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