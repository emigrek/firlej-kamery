import { FC, useMemo } from 'react'

import { usePlayerContext } from '../Player/context';
import * as DropdownMenu from '@client/components/ui/DropdownMenu';
import * as Switch from '@client/components/ui/Switch';
import { Button } from '@client/components/ui/Button';
import { HiCheck, HiCog } from 'react-icons/hi';
import { filters } from '@shared/filters';
import { MdHourglassBottom } from 'react-icons/md';

interface SettingsProps {
    snapshots: Snapshot[];
    filter?: SnapshotFilter;
    setFilter: React.Dispatch<React.SetStateAction<SnapshotFilter | undefined>>;
    ambientLight: boolean;
    setAmbientLight: React.Dispatch<React.SetStateAction<boolean>>;
}

const Settings: FC<SettingsProps> = ({ snapshots, filter, setFilter, ambientLight, setAmbientLight }) => {
    const { controlsNode, playerNode, fullscreen } = usePlayerContext();

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

    const onAmbientLightSelectHandler = (e: Event) => {
        e.preventDefault();
        setAmbientLight(!ambientLight);
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
                        <DropdownMenu.Item onSelect={onAmbientLightSelectHandler}>
                            Ambient Light
                            <DropdownMenu.RightSlot>
                                <Switch.Root checked={ambientLight}>
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
                    <DropdownMenu.Arrow/>
                </DropdownMenu.Content>
            </DropdownMenu.Portal>
        </DropdownMenu.Root>
    )
}

export default Settings;