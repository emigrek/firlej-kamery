import { FC } from 'react'

import * as Select from '@client/components/ui/Select';
import { filters } from '@shared/filters';
import { IoCheckmark, IoChevronDown } from 'react-icons/io5';
import { PlaybackAction, usePlayerContext } from '../Player/context';

interface FilterSelectProps {
    value: string;
    defaultValue: string;
    onValueChange: (value: string) => void;
}

const FilterSelect: FC<FilterSelectProps> = ({ ...props }) => {
    const { state, id } = usePlayerContext();

    return (
        <Select.Root
            {...props}
            disabled={state === PlaybackAction.Play}
        >
            <Select.Trigger className='h-10 px-3 md:h-12'>
                <Select.Value />
                <Select.Icon>
                    <IoChevronDown />
                </Select.Icon>
            </Select.Trigger>
            <Select.Portal container={document.getElementById(id)}>
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
                                            <IoCheckmark className='w-3 h-3 text-primary' />
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

export default FilterSelect;