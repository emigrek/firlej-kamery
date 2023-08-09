import { FC, useMemo, useState } from 'react'

import * as S from '@radix-ui/react-slider';
import * as Tooltip from '@radix-ui/react-tooltip';
import { usePlayerState, PlaybackAction } from '@client/stores/playerStore';

import { formatRelative } from 'date-fns'
import { pl } from 'date-fns/locale'

interface SliderProps {
    snapshot: Snapshot;
    snapshots: Snapshot[];
    setSnapshot: (snapshot: Snapshot) => void;
}

const Slider: FC<SliderProps> = ({ snapshot, setSnapshot, snapshots }) => {
    const { setState, setIndex } = usePlayerState();
    const [tooltipVisible, setTooltipVisible] = useState<boolean>(false);

    const value = useMemo(() => {
        return [snapshots.findIndex(s => s.url === snapshot.url)];
    }, [snapshots, snapshot]);

    const onValueChange = ([index]: [number]) => {
        const snapshot = snapshots[index];
        setTooltipVisible(true);
        setSnapshot(snapshot);
        setIndex(index);
        setState(PlaybackAction.Stop);
    }

    return (
        <Tooltip.Provider>
            <S.Root
                className='relative flex items-center w-full h-5 cursor-pointer select-none touch-none'
                value={value}
                onValueChange={onValueChange}
                min={0}
                max={snapshots.length - 1}
                step={1}
                onMouseEnter={() => setTooltipVisible(true)}
                onMouseLeave={() => setTooltipVisible(false)}
                onTouchStart={() => setTooltipVisible(true)}
                onTouchEnd={() => setTooltipVisible(false)}
            >
                <S.Track className='relative h-2 rounded-full grow bg-neutral-900/80'>
                    <S.Range className='absolute h-full rounded-full bg-neutral-500/20' />
                </S.Track>
                <Tooltip.Root open={tooltipVisible}>
                    <Tooltip.Trigger asChild>
                        <S.Thumb
                            className='block w-5 h-5 rounded-full bg-neutral-600 focus:outline-none focus:shadow-[0_0_0_8px] focus:shadow-neutral-300/20'
                        />
                    </Tooltip.Trigger>
                    <Tooltip.Content className='p-2 text-sm rounded-xl first-letter:uppercase bg-neutral-700' sideOffset={10} align="center">
                        {formatRelative(new Date(snapshot.timestamp), new Date(), { locale: pl })}
                        <Tooltip.Arrow className='fill-neutral-700' />
                    </Tooltip.Content>
                </Tooltip.Root>
            </S.Root>
        </Tooltip.Provider>
    )
}

export default Slider