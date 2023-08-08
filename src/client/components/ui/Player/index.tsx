import { FC, useCallback, useEffect } from 'react'

import { useTimer } from 'react-use-precision-timer';
import { Button } from '@client/components/ui/Button'
import { IoPlay, IoStop } from 'react-icons/io5'

import Slider from './Slider';
import { usePlayerState, PlayStateEnum } from './usePlayerState';

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
    const { toggle, state, setState, index, setIndex, interval } = usePlayerState();

    const nextImage = useCallback(() => {
        if (index >= snapshots.length) {
            toggle();
            setIndex(0);
            setSnapshot(defaultSnapshot);
            return;
        }

        setIndex(prev => prev + 1);
        setSnapshot(snapshots[index]);
    }, [setState, setSnapshot, snapshots, index]);

    const playTimer = useTimer({
        delay: interval,
        fireOnStart: true
    }, nextImage);

    useEffect(() => {
        state === PlayStateEnum.PLAY ? playTimer.start() : playTimer.stop();
    }, [state]);

    return (
        <div className='flex justify-between gap-2 px-3 text-white'>
            <div className='flex items-center'>
                <Button
                    variant={'accent'}
                    onClick={toggle}
                    iconRight={
                        state === PlayStateEnum.PLAY ? IoStop : IoPlay
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