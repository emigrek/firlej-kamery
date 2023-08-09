import { FC } from 'react'

import { differenceInHours } from 'date-fns';
import * as Select from '@client/components/ui/Select';
import { filters } from '@shared/filters';
import { IoCheckmark, IoChevronDown } from 'react-icons/io5';

import useCameraStore from '@client/stores/cameraStore';
import { PlaybackAction, usePlayerStore } from '@client/stores/playerStore';

const PlayerSelect: FC = () => {
    const { state } = usePlayerStore();
    const { snapshots, setFilteredSnapshots, setSnapshot, filter, setFilter } = useCameraStore();

    const onChange = (value: string) => {
        const filter = filters.find(f => f.label === value);
        if (!filter) return;

        const filtered = [...snapshots].filter(filter.function);
        setFilter(filter);
        setFilteredSnapshots(filtered);

        setSnapshot(filtered.at(-1) || null);
    }

    return (
        <Select.Root
            defaultValue={filter.label}
            value={filter.label}
            onValueChange={onChange}
            disabled={state === PlaybackAction.Play}
        >
            <Select.Trigger placeholder='select'>
                <Select.Value />
                <Select.Icon>
                    <IoChevronDown />
                </Select.Icon>
            </Select.Trigger>
            <Select.Portal>
                <Select.Content>
                    <Select.Viewport>
                        <Select.Group>
                            <Select.Label>
                                Przedział czasowy
                            </Select.Label>
                            {
                                filters.map(filter => (
                                    <Select.Item key={filter.label} value={filter.label}>
                                        <Select.ItemText>
                                            {filter.label}
                                        </Select.ItemText>
                                        <Select.ItemIndicator>
                                            <IoCheckmark className='w-3 h-3' />
                                        </Select.ItemIndicator>
                                    </Select.Item>
                                ))
                            }
                        </Select.Group>
                    </Select.Viewport>
                </Select.Content>
            </Select.Portal>
        </Select.Root>
    )
}

export default PlayerSelect;