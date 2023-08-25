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
    const { controlsRef, state } = usePlayerContext();

    return (
        <div
            ref={controlsRef}
            className={
                cn(
                    "z-10 absolute inset-0 flex flex-col w-full h-full pointer-events-none",
                    "transition-all duration-300 opacity-0 group-hover/player:opacity-100 group-focus/player:opacity-100 group-active/player:opacity-100",
                    state !== PlaybackAction.Play && "opacity-100",
                    className
                )
            }
            {...props}
        />
    )
}

interface BaseControlProps extends HTMLAttributes<HTMLDivElement> { }

function Bottom({ className, ...props }: BaseControlProps) {
    const { sourceSet } = usePlayerContext();

    return (
        <div
            className={
                cn(
                    "pointer-events-auto absolute bottom-0 flex justify-between text-white h-20 w-full bg-gradient-to-b from-transparent to-neutral-950/90",
                    sourceSet.length > 1 ? "pb-5" : "pb-0",
                    className
                )
            }
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
    const { state, toggle, preloading, sourceSet } = usePlayerContext();

    const playIcon = PlayIcon ? PlayIcon : IoPlay;
    const pauseIcon = PauseIcon ? PauseIcon : IoPause;

    const iconRight = useMemo(() => {
        if (state === PlaybackAction.Play) return pauseIcon;
        return playIcon;
    }, [state]);

    if (sourceSet.length <= 1)
        return null;

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

    if (sourceSet.length <= 1)
        return null;

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
    const { setIndex, index, setState, sourceSet } = usePlayerContext();

    const handlePrev = () => {
        if (index === 0) {
            setState(PlaybackAction.Pause);
            return;
        }

        setState(PlaybackAction.Pause);
        setIndex(index - 1);
    }

    if (sourceSet.length <= 1)
        return null;

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
    const { fullscreen, playerNode } = usePlayerContext();

    const toggle = () => {
        if (!playerNode) return;

        if (!document.fullscreenElement) {
            playerNode.requestFullscreen();
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
    const { sourceSet, setState, index, setIndex, progressTooltipVisible, setProgressTooltipVisible, progressThumbRef, progressThumbNode, playerNode } = usePlayerContext();

    const onValueChange = (value: number[]) => {
        setIndex(value[0]);
        setState(PlaybackAction.Pause);
    }

    const value = useMemo(() => {
        return sourceSet.indexOf(
            sourceSet.at(index) || ""
        ) || 0
    }, [sourceSet, index]);

    if (sourceSet.length <= 1)
        return null;

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
                    <Tooltip.Portal
                        container={progressThumbNode}
                    >
                        <Tooltip.Content collisionBoundary={playerNode} className='text-neutral-300' sideOffset={5} align="center">
                            {tooltipContent(value)}
                        </Tooltip.Content>
                    </Tooltip.Portal>
                </Tooltip.Root>
            </ProgressPrimitive.Root>
        </Tooltip.Provider>
    )
}

interface IndicatorProps {
    indicatorContent: (index: number, sourceSet: string[]) => React.ReactNode,
}

function Indicator({ indicatorContent }: IndicatorProps) {
    const { sourceSet, index } = usePlayerContext();
    return sourceSet.length > 1 ? indicatorContent(index, sourceSet) : null;
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