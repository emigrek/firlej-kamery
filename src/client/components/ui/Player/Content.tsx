import cn from '@client/utils/cn';
import { HTMLAttributes, FC } from 'react';
import { usePlayerContext } from './context';
import { VariantProps, cva } from 'class-variance-authority';

const playerContentVariants = cva(
    "relative overflow-hidden group/player select-none aspect-video",
    {
        variants: {
            size: {
                default: "w-full h-full",
                windowed: "w-[21rem] xs:w-[24rem] sm:w-auto sm:h-[20rem] md:h-[26rem] lg:h-[35rem]",
                fullscreen: "w-screen h-screen"
            },
            rounded: {
                default: "rounded-none",
                sm: "rounded-sm",
                md: "rounded-md",
                lg: "rounded-lg",
                xl: "rounded-xl",
                "2xl": "rounded-2xl",
                "3xl": "rounded-3xl",
                full: "rounded-full"
            }
        },
        defaultVariants: {
            size: "default",
            rounded: "default"
        }
    }
);

interface ContentProps extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof playerContentVariants> { }

const Content: FC<ContentProps> = ({ className, children, size, rounded, ...props }) => {
    const { fullscreen, playerRef } = usePlayerContext();

    return (
        <div
            ref={playerRef}
            data-fullscreen={fullscreen}
            className={
                cn(
                    playerContentVariants({ 
                        size: fullscreen ? "fullscreen" : size,
                        rounded 
                    }),
                    className
                )
            }
            {...props}
        >
            {children}
        </div>
    )
}

export { Content, playerContentVariants };