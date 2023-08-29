import { FC, HTMLAttributes, Suspense, useMemo, useState } from 'react';
import { Camera as CameraInterface } from '@shared/cameras';
import { filters } from "@shared/filters";

import * as Player from '@client/components/ui/Player';
import BoundaryError from "./BoundaryError";
import Loader from "./Loader";
import FilterSelect from './FilterSelect';
import ImageError from './ImageError';
import IndicatorContent from './IndicatorContent';

import { useSnapshots } from '@client/hooks/useSnapshots';
import { useQueryErrorResetBoundary } from '@tanstack/react-query';

import { ErrorBoundary } from 'react-error-boundary';

import { formatRelative } from 'date-fns';
import { pl } from 'date-fns/locale';

import { playerContentVariants } from '@client/components/ui/Player/Content';

interface CameraProps extends HTMLAttributes<HTMLDivElement> {
    camera: CameraInterface;
}

const Camera: FC<CameraProps> = ({ camera, ...props }) => {
    const { data } = useSnapshots(camera);
    const [filter, setFilter] = useState<SnapshotFilter | undefined>(filters.at(0));

    const srcSet = useMemo(() => {
        return [...data]
            .filter(filter?.function || (() => true))
            .map(s => s.url);
    }, [data, filter]);
    const index = useMemo(() => srcSet.length - 1, [srcSet]);

    const filterItems = useMemo(() => {
        return filters.map(f => ({
            label: f.label,
            value: f.label,
            disabled: Boolean(![...data].filter(f.function).length)
        }))
    }, [srcSet]);

    const onFilterValueChange = (value: string) => {
        const filter = filters.find(f => f.label === value);
        if (!filter) return;

        setFilter(filter);
    }

    const tooltipContent = (value: number) => {
        const snapshotSource = srcSet.at(value);
        const snapshot = data.find(s => s.url === snapshotSource);

        if (!snapshot) return;

        return (
            formatRelative(new Date(snapshot.timestamp), new Date(), { locale: pl })
        )
    };

    return (
        <Player.Root sourceSet={srcSet} index={index} ambientLight {...props}>
            <Player.Content
                className='mx-2'
                rounded={'md'}
                size={'windowed'}
            >
                <Player.Screen
                    loadingComponent={<Loader />}
                    errorComponent={<ImageError />}
                />
                <Player.Controls>
                    <Player.Controls.Progress
                        tooltipContent={tooltipContent}
                    />
                    <Player.Controls.Bottom>
                        <Player.Controls.Left>
                            <Player.Controls.Prev />
                            <Player.Controls.Play />
                            <Player.Controls.Next />
                            <Player.Controls.Indicator indicatorContent={IndicatorContent} />
                        </Player.Controls.Left>
                        <Player.Controls.Right>
                            {
                                filter && (
                                    <FilterSelect
                                        items={filterItems}
                                        value={filter.label}
                                        defaultValue={filter.label}
                                        onValueChange={onFilterValueChange}
                                    />
                                )
                            }
                            <Player.Controls.Fullscreen />
                        </Player.Controls.Right>
                    </Player.Controls.Bottom>
                </Player.Controls>
            </Player.Content>
        </Player.Root>
    )
}

const CameraFallbackRender = ({ resetErrorBoundary }: { error: Error, resetErrorBoundary: () => void }) => {
    return (
        <div className={playerContentVariants({ size: 'windowed', rounded: 'md' })}>
            <BoundaryError onClick={resetErrorBoundary} />
        </div>
    )
};

const CameraErrorBoundary: FC<CameraProps> = ({ camera, ...props }) => {
    const { reset } = useQueryErrorResetBoundary();

    return (
        <Suspense
            fallback={
                <div className={playerContentVariants({ size: 'windowed', rounded: 'md' })}>
                    <Loader />
                </div>
            }
        >
            <ErrorBoundary
                onReset={reset}
                fallbackRender={CameraFallbackRender}
            >
                <Camera
                    camera={camera}
                    {...props}
                />
            </ErrorBoundary>
        </Suspense>
    )
}

export default CameraErrorBoundary;  