import { cva } from 'class-variance-authority'
import { ButtonHTMLAttributes, forwardRef } from 'react'
import { VariantProps } from 'class-variance-authority'
import cn from '@/utils/cn';
import { IconType } from 'react-icons/lib';
import Spinner from '@/components/ui/Spinner';

const buttonVariants = cva(
    "relative w-fit flex items-center justify-center rounded-full font-semibold tracking-wide transition duration-200 ease-in-out focus:outline-none disabled:cursor-not-allowed disabled:opacity-90",
    {
        variants: {
            variant: {
                default: "text-neutral-200 bg-neutral-500/20 hover:bg-neutral-500/60 focus:ring-2 focus:ring-neutral-500/50",
                accent: "bg-tulip-tree-300/20 hover:bg-atulip-tree-300/60 focus:ring-2 focus:ring-tulip-tree-300/50",
                transparent: "text-neutral-100 bg-transparent hover:bg-neutral-500/10 focus:ring-2 focus:ring-neutral-500/20",
            },
            size: {
                small: "px-4 h-8 text-sm gap-2",
                medium: "px-5 h-12 text-base gap-2",
                large: "px-6 h-16 text-lg gap-2"
            }
        },
        defaultVariants: {
            variant: "default",
            size: "medium"
        }
    }
);

const buttonIconVariants = cva(
    "",
    {
        variants: {
            variant: {
                default: "fill-white",
                accent: "fill-accent-500",
                transparent: "fill-neutral-100"
            },
            size: {
                small: "w-4 h-4",
                medium: "w-5 h-5",
                large: "w-6 h-6"
            }
        },
        defaultVariants: {
            variant: "default",
            size: "medium"
        }
    }
)

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    loading?: boolean;
    iconLeft?: IconType,
    iconRight?: IconType
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ children, iconLeft: IconL, iconRight: IconR, className, size, variant, loading, ...props }, ref) => {
    return (
        <button
            ref={ref}
            className={cn(buttonVariants({ className, size, variant }))}
            disabled={loading}
            {...props}
        >
            {IconL ? <IconL className={cn(buttonIconVariants({ size, variant }))} /> : null}
            {loading ? (
                <div className="absolute inset-0 flex items-center justify-center w-full h-full text-white rounded-full bg-neutral-900/90">
                    <Spinner className='w-8 h-8'/>
                </div>
            ) : null}
            {children}
            {IconR ? <IconR className={cn(buttonIconVariants({ size, variant }))} /> : null}
        </button>
    )
})

Button.displayName = "Button";

export { Button };