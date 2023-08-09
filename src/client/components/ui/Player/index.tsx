import { FC, useCallback, useEffect, useState } from 'react'

import { useTimer } from 'react-use-precision-timer';
import { IoPlay, IoStop } from 'react-icons/io5'

import { Button } from '@client/components/ui/Button'
import Slider from './Slider';

import { PlaybackAction, usePlayerState } from '@client/stores/playerStore';
import { cacheImages } from '@client/utils/cacheImages';

interface PlayerProps {
    snapshots: Snapshot[]
    snapshot: Snapshot
    setSnapshot: (snapshot: Snapshot) => void
    defaultSnapshot: Snapshot
    isLoading: boolean
    isError: boolean
    refetch: () => void
}

const Player: FC<PlayerProps> = ({ snapshots, snapshot, setSnapshot, defaultSnapshot }) => {
    const [preloading, setPreloading] = useState<boolean>(false);
    const { toggle, state, setState, index, setIndex, speed } = usePlayerState();

    const nextImage = useCallback(() => {
        if (index >= snapshots.length) {
            toggle();
            setIndex(0);
            setSnapshot(defaultSnapshot);
            return;
        }

        setIndex(index + 1);
        setSnapshot(snapshots[index]);
    }, [setState, setSnapshot, snapshots, index]);

    const timer = useTimer({
        delay: speed,
        fireOnStart: true
    }, nextImage);

    useEffect(() => {
        state === PlaybackAction.Play ? timer.start() : timer.stop();
    }, [state]);

    const togglePlayback = async () => {
        if (state === PlaybackAction.Stop) {
            setPreloading(true);
            cacheImages(snapshots.map(s => s.url))
                .then(() => {
                    setPreloading(false);
                    toggle();
                });
        } else {
            toggle();
        }
    }

    return (
        <div className='flex justify-between gap-2 px-4 text-white'>
            <div className='flex items-center'>
                <Button
                    loading={preloading}
                    onClick={togglePlayback}
                    iconRight={
                        state === PlaybackAction.Play ? IoStop : IoPlay
                    }
                />
            </div>
            <div className='flex items-center flex-grow'>
                <Slider snapshot={snapshot} setSnapshot={setSnapshot} snapshots={snapshots} />
            </div>
        </div>
    )
}

export default Player