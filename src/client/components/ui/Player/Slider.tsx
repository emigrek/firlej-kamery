import { FC, useMemo, useState } from 'react'

import * as Slider from "@client/components/ui/Slider";
import * as Tooltip from "@client/components/ui/Tooltip";

import { formatRelative } from 'date-fns'
import { pl } from 'date-fns/locale'

import { usePlayerStore, PlaybackAction } from '@client/stores/playerStore';
import useCameraStore from '@client/stores/cameraStore';

const PlayerSlider: FC = () => {
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
            <Slider.Root
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
                <Slider.Track>
                    <Slider.Range />
                </Slider.Track>
                <Tooltip.Root open={tooltipVisible}>
                    <Tooltip.Trigger asChild>
                        <Slider.Thumb />
                    </Tooltip.Trigger>
                    <Tooltip.Content sideOffset={10} align="center">
                        {snapshot && formatRelative(new Date(snapshot.timestamp), new Date(), { locale: pl })}
                        <Tooltip.Arrow />
                    </Tooltip.Content>
                </Tooltip.Root>
            </Slider.Root>
        </Tooltip.Provider>
    )
}

export default PlayerSlider