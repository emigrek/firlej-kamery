import { FC, useMemo } from 'react'

import { usePlayerContext } from '../Player/context';
import { filters } from '@shared/filters';

import * as DropdownMenu from '@client/components/ui/DropdownMenu';
import * as Switch from '@client/components/ui/Switch';
import { Button } from '@client/components/ui/Button';

import { HiCheck, HiCog } from 'react-icons/hi';
import { MdHourglassBottom } from 'react-icons/md';
import { IoPlay } from 'react-icons/io5';

interface SettingsProps {
    snapshots: Snapshot[];
    filter?: SnapshotFilter;
    setFilter: React.Dispatch<React.SetStateAction<SnapshotFilter | undefined>>;
    ambientLights: boolean;
    setAmbientLights: React.Dispatch<React.SetStateAction<boolean>>;
}

const Settings: FC<SettingsProps> = ({ snapshots, filter, setFilter, ambientLights, setAmbientLights }) => {
    const { controlsNode } = usePlayerContext();

    const filterItems = useMemo(() => {
        return filters.map(f => ({
            label: f.label,
            value: f.label,
            disabled: Boolean(![...snapshots].filter(f.function).length)
        }))
    }, [snapshots])

    const onRadioValueChangeHandler = (value: string) => {
        const filter = filters.find(f => f.label === value);
        if (!filter) return;

        setFilter(filter);
    };

    const onAmbientLightsSelectHandler = (e: Event) => {
        e.preventDefault();
        setAmbientLights(prev => !prev);
    }

    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
                <Button
                    className={"h-10 px-3 md:px-4 md:h-12 group"}
                    variant={'transparent'}
                >
                    <HiCog className={'h-5 w-5 md:h-5 md:w-5 transition-transform duration-200 group-data-[state=open]:rotate-[24deg]'} />
                </Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal container={controlsNode}>
                <DropdownMenu.Content className='min-w-[190px]' side={'top'} sideOffset={2}>
                    <DropdownMenu.Group>
                        <DropdownMenu.Label>
                            <IoPlay />
                            Odtwarzacz
                        </DropdownMenu.Label>
                        <DropdownMenu.Item onSelect={onAmbientLightsSelectHandler}>
                            Ambient Lights
                            <DropdownMenu.RightSlot>
                                <Switch.Root checked={ambientLights}>
                                    <Switch.Thumb />
                                </Switch.Root>
                            </DropdownMenu.RightSlot>
                        </DropdownMenu.Item>
                    </DropdownMenu.Group>
                    <DropdownMenu.RadioGroup value={filter?.label} onValueChange={onRadioValueChangeHandler}>
                        <DropdownMenu.Label>
                            <MdHourglassBottom />
                            Przedział czasu
                        </DropdownMenu.Label>
                        {
                            filterItems.map(f => (
                                <DropdownMenu.RadioItem
                                    key={f.label}
                                    value={f.label}
                                    disabled={f.disabled}
                                >
                                    {f.label}
                                    <DropdownMenu.RightSlot>
                                        <DropdownMenu.ItemIndicator>
                                            <HiCheck className='fill-primary' />
                                        </DropdownMenu.ItemIndicator>
                                    </DropdownMenu.RightSlot>
                                </DropdownMenu.RadioItem>
                            ))
                        }
                    </DropdownMenu.RadioGroup>
                    <DropdownMenu.Arrow />
                </DropdownMenu.Content>
            </DropdownMenu.Portal>
        </DropdownMenu.Root>
    )
}

export default Settings;