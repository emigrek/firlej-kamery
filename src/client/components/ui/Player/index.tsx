import { FC, useCallback, useState, HTMLAttributes } from 'react'
import { cacheSnapshots } from '@client/utils/cacheSnapshots';
import { IoPause, IoPlay } from 'react-icons/io5'

import { Button } from '@client/components/ui/Button'
import Progress from './Progress';
import Select from './Select';

import { PlaybackAction, usePlayerStore } from '@client/stores/playerStore';
import useCameraStore from '@client/stores/cameraStore';
import cn from '@client/utils/cn';
import { usePlayerTimer } from './usePlayerTimer';

interface PlayerProps extends HTMLAttributes<HTMLDivElement> {
    defaultSnapshot: Snapshot
    isLoading: boolean
    isError: boolean
    refetch: () => void
}

const Player: FC<PlayerProps> = ({ defaultSnapshot, refetch, className, isError, isLoading, ...props }) => {
    const [preloading, setPreloading] = useState<boolean>(false);
    const { toggle, state, setState, index, setIndex, speed } = usePlayerStore();
    const { filteredSnapshots, setSnapshot } = useCameraStore();

    const nextImage = useCallback(() => {
        if (index >= filteredSnapshots.length) {
            toggle();
            setIndex(0);
            setSnapshot(filteredSnapshots.at(-1) || defaultSnapshot);
            return;
        }

        setIndex(index + 1);
        setSnapshot(filteredSnapshots.at(index) || defaultSnapshot);
    }, [setState, setSnapshot, filteredSnapshots, index]);

    usePlayerTimer(nextImage, speed);

    const togglePlayback = async () => {
        if (state != PlaybackAction.Stop) {
            toggle();
            return;
        }

        setPreloading(true);
        cacheSnapshots(filteredSnapshots, index)
            .catch((src) => {
                console.error(src);
                refetch();
            })
            .finally(() => {
                setPreloading(false);
                toggle();
            });
    }

    return (
        <div
            className={
                cn('flex flex-col-reverse md:flex-col text-white bg-gradient-to-b from-transparent to-neutral-950/80', className)
            }
            {...props}
        >
            <Progress />
            <div className='flex items-center justify-between px-2 md:pb-2'>
                <Button
                    className='h-10 px-3 md:px-4 md:h-12'
                    variant={'transparent'}
                    loading={preloading}
                    onClick={togglePlayback}
                    iconRight={
                        state === PlaybackAction.Play ? IoPause : IoPlay
                    }
                />
                <Select />
            </div>
        </div>
    )
}

export default Player