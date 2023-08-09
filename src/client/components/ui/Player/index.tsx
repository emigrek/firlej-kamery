import { FC, useCallback, useEffect, useState } from 'react'

import { useTimer } from 'react-use-precision-timer';
import { cacheSnapshots } from '@client/utils/cacheSnapshots';
import { IoPlay, IoStop } from 'react-icons/io5'

import { Button } from '@client/components/ui/Button'
import Slider from './Slider';
import Select from './Select';

import { PlaybackAction, usePlayerStore } from '@client/stores/playerStore';
import useCameraStore from '@client/stores/cameraStore';

interface PlayerProps {
    defaultSnapshot: Snapshot
    isLoading: boolean
    isError: boolean
    refetch: () => void
}

const Player: FC<PlayerProps> = ({ defaultSnapshot, refetch }) => {
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

    const timer = useTimer({
        delay: speed,
        fireOnStart: true
    }, nextImage);

    useEffect(() => {
        state === PlaybackAction.Play ? timer.start() : timer.stop();
    }, [state]);

    const togglePlayback = async () => {
        if (state != PlaybackAction.Stop) {
            toggle();
            return;
        }

        setPreloading(true);
        cacheSnapshots(filteredSnapshots, index)
            .catch((src) => {
                console.error(`Couldn't cache snapshot src: ${src}`);
                refetch();
            })
            .finally(() => {
                setPreloading(false);
                toggle();
            });
    }

    return (
        <div className='flex justify-between gap-3 px-3 py-1 mx-1 text-white'>
            <div className='flex items-center'>
                <Button
                    loading={preloading}
                    onClick={togglePlayback}
                    iconRight={
                        state === PlaybackAction.Play ? IoStop : IoPlay
                    }
                />
            </div>
            <div className='flex items-center'>
                <Select />
            </div>
            <div className='flex items-center flex-grow'>
                <Slider />
            </div>
        </div>
    )
}

export default Player