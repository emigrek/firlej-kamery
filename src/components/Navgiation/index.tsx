import { FC, HTMLAttributes, forwardRef } from 'react'
import { cva } from 'class-variance-authority';
import { VariantProps } from 'class-variance-authority';
import cn from '@/utils/cn';


const navigationVariants = cva(
    "w-full absolute top-0 left-0 right-0 z-10 shadow-md",
    {
        variants: {
            variant: {
                dark: "bg-neutral-950/60 backdrop-blur-sm text-neutral-200"
            },
            size: {
                sm: "h-12",
                md: "h-14",
                lg: "h-20"
            }
        },
        defaultVariants: {
            variant: "dark",
            size: "md"
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