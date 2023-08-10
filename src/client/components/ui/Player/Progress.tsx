import { FC, useMemo, useState } from 'react'

import * as Progress from "@client/components/ui/Progress";
import * as Tooltip from "@client/components/ui/Tooltip";

import { formatRelative } from 'date-fns'
import { pl } from 'date-fns/locale'

import { usePlayerStore, PlaybackAction } from '@client/stores/playerStore';
import useCameraStore from '@client/stores/cameraStore';

const PlayerProgress: FC = () => {
    const { setState, setIndex } = usePlayerStore();
    const { filteredSnapshots, snapshot, setSnapshot } = useCameraStore();
    const [tooltipVisible, setTooltipVisible] = useState<boolean>(false);

    const value = useMemo(() => {
        if (!snapshot) return [0];
        return [filteredSnapshots.findIndex(s => s.url === snapshot.url)];
    }, [filteredSnapshots, snapshot]);

    const onValueChange = ([index]: [number]) => {
        const snapshot = filteredSnapshots[index];
        setTooltipVisible(true);
        setSnapshot(snapshot);
        setIndex(index);
        setState(PlaybackAction.Stop);
    }

    return (
        <Tooltip.Provider>
            <Progress.Root
                value={value}
                onValueChange={onValueChange}
                min={0}
                max={filteredSnapshots.length - 1}
                step={1}
                onMouseEnter={() => setTooltipVisible(true)}
                onMouseLeave={() => setTooltipVisible(false)}
                onTouchStart={() => setTooltipVisible(true)}
                onTouchEnd={() => setTooltipVisible(false)}
            >
                <Progress.Track>
                    <Progress.Range />
                </Progress.Track>
                <Tooltip.Root open={tooltipVisible}>
                    <Tooltip.Trigger asChild>
                        <Progress.Thumb />
                    </Tooltip.Trigger>
                    <Tooltip.Content className='text-neutral-300' sideOffset={1} align="center">
                        {   
                            snapshot && formatRelative(new Date(snapshot.timestamp), new Date(), { locale: pl })
                        }
                        <Tooltip.Arrow />
                    </Tooltip.Content>
                </Tooltip.Root>
            </Progress.Root>
        </Tooltip.Provider>
    )
}

export default PlayerProgress