import { FC, HTMLAttributes, forwardRef } from 'react'
import { cva } from 'class-variance-authority';
import { VariantProps } from 'class-variance-authority';
import cn from '@/utils/cn';

const navigationVariants = cva(
    "mx-auto flex justify-center fixed bottom-0 md:top-0 left-0 right-0 z-20 h-16",
    {
        variants: {
            variant: {
                dark: "bg-transparent"
            }
        },
        defaultVariants: {
            variant: "dark"
        }
    }
);

const navigationContentVariants = cva(
    "flex items-center h-full gap-8 px-8 md:backdrop-blur-sm rounded-t-3xl md:rounded-b-3xl md:rounded-t-none shadow-xl",
    {
        variants: {
            variant: {
                dark: "bg-neutral-950 md:bg-neutral-950/80 text-neutral-200"
            }
        },
        defaultVariants: {
            variant: "dark"
        }
    }
)

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
            <div className={cn(
                navigationContentVariants({ className, variant })
            )}>
                {children}
            </div>
        </nav>
    );
});

export default Navigation;