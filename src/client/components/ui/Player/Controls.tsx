import cn from "@client/utils/cn";
import { HTMLAttributes, useMemo } from "react";
import { Button, buttonVariants } from "../Button";
import { PlaybackAction, usePlayerContext } from "./context";
import { VariantProps } from "class-variance-authority";
import { IoChevronBack, IoChevronForward, IoPause, IoPlay } from "react-icons/io5";
import { IconType } from "react-icons/lib";
import { MdFullscreen, MdFullscreenExit } from "react-icons/md";

import * as ProgressPrimitive from "@client/components/ui/Progress";
import * as Tooltip from "@client/components/ui/Tooltip";

interface ControlsProps extends HTMLAttributes<HTMLDivElement> { }

function Controls({ className, ...props }: ControlsProps) {
    const { controlsRef } = usePlayerContext();

    return (
        <div 
            ref={controlsRef}
            className={
                cn(
                    "z-10 absolute inset-0 flex flex-col w-full h-full pointer-events-none",
                    "transition-all duration-300 opacity-0 group-hover/player:opacity-100 group-focus/player:opacity-100 group-active/player:opacity-100",
                    className
                )
            }
            {...props}
        />
    )
}

interface BaseControlProps extends HTMLAttributes<HTMLDivElement> { }

function Bottom({ className, ...props }: BaseControlProps) {
    return (
        <div
            className={cn("pointer-events-auto absolute bottom-0 pb-5 flex justify-between text-white w-full h-20 bg-gradient-to-b from-transparent to-neutral-950/90", className)}
            {...props}
        />
    )
}

function Left({ className, ...props }: BaseControlProps) {
    return (
        <div
            className={cn("flex justify-self-start items-center px-2 gap-2", className)}
            {...props}
        />
    )
}

function Right({ className, ...props }: BaseControlProps) {
    return (
        <div
            className={cn("flex justify-self-end items-center px-2 gap-2", className)}
            {...props}
        />
    )
}

interface PlayProps extends HTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    playIcon?: IconType,
    pauseIcon?: IconType,
    stopIcon?: IconType
}

function Play({ playIcon: PlayIcon, pauseIcon: PauseIcon, stopIcon: StopIcon, className, ...props }: PlayProps) {
    const { state, toggle, preloading } = usePlayerContext();

    const playIcon = PlayIcon ? PlayIcon : IoPlay;
    const pauseIcon = PauseIcon ? PauseIcon : IoPause;

    const iconRight = useMemo(() => {
        if (state === PlaybackAction.Play) return pauseIcon;
        return playIcon;
    }, [state]);

    return (
        <Button
            className={cn("h-10 px-3 md:px-4 md:h-12", className)}
            variant={'transparent'}
            loading={preloading}
            onClick={toggle}
            iconRight={iconRight}
            {...props}
        />
    )
}

interface NextProps extends HTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    icon?: IconType
}

function Next({ icon: Icon, ...props }: NextProps) {
    const { setIndex, sourceSet, index, setState } = usePlayerContext();

    const handleNext = () => {
        if (sourceSet.length - 1 === index) {
            setState(PlaybackAction.Pause);
            return;
        }

        setState(PlaybackAction.Pause);
        setIndex(index + 1);
    }

    return (
        <Button
            variant={'transparent'}
            size={'small'}
            onClick={handleNext}
            iconRight={
                Icon ? Icon : IoChevronForward
            }
            {...props}
        />
    )
}

interface PrevProps extends HTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    icon?: IconType
}

function Prev({ icon: Icon, className, ...props }: PrevProps) {
    const { setIndex, index, setState } = usePlayerContext();

    const handlePrev = () => {
        if (index === 0) {
            setState(PlaybackAction.Pause);
            return;
        }

        setState(PlaybackAction.Pause);
        setIndex(index - 1);
    }

    return (
        <Button
            variant={'transparent'}
            size={'small'}
            onClick={handlePrev}
            iconRight={
                Icon ? Icon : IoChevronBack
            }
            {...props}
        />
    )
}

interface FullscreenProps extends HTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    iconOn?: IconType,
    iconOff?: IconType
}

function Fullscreen({ iconOn: IconOn, iconOff: IconOff, className, ...props }: FullscreenProps) {
    const { fullscreen, id } = usePlayerContext();

    const toggle = () => {
        const player = document.querySelector(`.player-${id}`);
        if (!player) return;

        if (!document.fullscreenElement) {
            player.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    }

    return (
        <Button
            className={cn("h-10 px-3 md:px-4 md:h-12", className)}
            variant={'transparent'}
            onClick={toggle}
            iconRight={
                fullscreen ? (IconOff ? IconOff : MdFullscreenExit) : (IconOn ? IconOn : MdFullscreen)
            }
            {...props}
        />
    )
}

interface ProgressProps extends HTMLAttributes<typeof ProgressPrimitive.Root> {
    tooltipContent: (value: number) => React.ReactNode
}

function Progress({ className, tooltipContent, ...props }: ProgressProps) {
    const { sourceSet, setState, index, setIndex, progressTooltipVisible, setProgressTooltipVisible, progressThumbRef } = usePlayerContext();

    const onValueChange = (value: number[]) => {
        setIndex(value[0]);
        setState(PlaybackAction.Pause);
    }

    const value = useMemo(() => {
        return sourceSet.indexOf(
            sourceSet.at(index) || ""
        ) || 0
    }, [sourceSet, index]);

    return (
        <Tooltip.Provider
            {...props}
        >
            <ProgressPrimitive.Root
                value={[value]}
                onValueChange={onValueChange}
                className={cn("absolute bottom-0 z-10 mb-2 pointer-events-auto", className)}
                min={0}
                max={sourceSet.length - 1}
                step={1}
                onMouseEnter={() => setProgressTooltipVisible(true)}
                onMouseLeave={() => setProgressTooltipVisible(false)}
                onTouchStart={() => setProgressTooltipVisible(true)}
                onTouchEnd={() => setProgressTooltipVisible(false)}
                onTouchCancel={() => setProgressTooltipVisible(false)}
            >
                <ProgressPrimitive.Track>
                    <ProgressPrimitive.Range />
                </ProgressPrimitive.Track>
                <Tooltip.Root open={progressTooltipVisible}>
                    <Tooltip.Trigger asChild>
                        <ProgressPrimitive.Thumb ref={progressThumbRef} />
                    </Tooltip.Trigger>
                    <Tooltip.Content className='text-neutral-300' sideOffset={1} align="center">
                        {tooltipContent(value)}
                        <Tooltip.Arrow />
                    </Tooltip.Content>
                </Tooltip.Root>
            </ProgressPrimitive.Root>
        </Tooltip.Provider>
    )
}

interface IndicatorProps {
    indicatorContent: (index: number, sourceSet: string[]) => React.ReactNode,
}

function Indicator({ indicatorContent }: IndicatorProps) {
    const { sourceSet, index, progressTooltipVisible } = usePlayerContext();
    return !progressTooltipVisible ? indicatorContent(index, sourceSet) : null;
}

Controls.Bottom = Bottom;
Controls.Left = Left;
Controls.Right = Right;
Controls.Prev = Prev;
Controls.Play = Play;
Controls.Next = Next;
Controls.Indicator = Indicator;
Controls.Fullscreen = Fullscreen;
Controls.Progress = Progress;

export default Controls;