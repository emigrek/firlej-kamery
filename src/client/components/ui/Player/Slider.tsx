import { FC, useMemo } from 'react'

import * as S from '@radix-ui/react-slider';

interface SliderProps {
    snapshot: Snapshot;
    snapshots: Snapshot[];
    setSnapshot: (snapshot: Snapshot) => void;
}

const Slider: FC<SliderProps> = ({ snapshot, setSnapshot, snapshots }) => {
    const value = useMemo(() => {
        return [snapshots.findIndex(s => s.url === snapshot.url)];
    }, [snapshots, snapshot]);

    const onValueChange = ([index]: [number]) => {
        const snapshot = snapshots[index];
        setSnapshot(snapshot);
    }

    return (
        <S.Root
            className='relative flex items-center w-full h-5 select-none'
            value={value}
            onValueChange={onValueChange}
            min={0}
            max={snapshots.length - 1}
            step={1}
        >
            <S.Track className='relative h-2 rounded-full grow'>
                <S.Range className='absolute h-full rounded-full bg-primary-300/20' />
            </S.Track>
            <S.Thumb className='block w-5 h-5 rounded-full bg-primary focus:outline-none focus:shadow-[0_0_0_8px] focus:shadow-primary/20' />
        </S.Root>
    )
}

export default Slider