import { FC, useState } from 'react'
import cameras, { Camera } from '@shared/cameras'
import { Link } from 'react-router-dom';
import { useTimer } from 'react-use-precision-timer';

import Grid from '@client/components/ui/Grid'
import * as Player from "@client/components/ui/Player";
import Loader from '@client/components/ui/Camera/Loader';
import ImageError from '@client/components/ui/Camera/ImageError';

const GridView: FC = () => {
    return (
        <Grid>
            {cameras.map((camera) => <CameraCell key={camera.id} camera={camera} />)}
        </Grid>
    )
}

interface CameraCellProps {
    camera: Camera
}

const CameraCell: FC<CameraCellProps> = ({ camera }) => {
    const { id, url, name } = camera;
    const [refreshKey, setRefreshKey] = useState<string>(`${id}${Date.now()}`);

    useTimer({
        delay: 1000 * 60 * 2,
        startImmediately: true
    }, () => {
        setRefreshKey(`${id}${Date.now()}`);
    });

    return (
        <Grid.Cell>
            <Link to={`/camera/${encodeURIComponent(name.toLowerCase())}`}>
                <Player.Root ambientLights={false} sourceSet={[url]} index={0}>
                    <Player.Content rounded={'md'}>
                        <Player.Screen
                            className='bg-neutral-900'
                            refreshKey={refreshKey}
                            loadingComponent={<Loader />}
                            errorComponent={<ImageError />}
                        />
                    </Player.Content>
                </Player.Root>
            </Link>
        </Grid.Cell>
    )
}

export default GridView