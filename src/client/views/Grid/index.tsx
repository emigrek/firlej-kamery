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
    const { url, name } = camera;
    const [date, setDate] = useState<number>(Date.now());

    useTimer({
        delay: 1000 * 60 * 2,
        startImmediately: true
    }, () => {
        setDate(Date.now());
    });

    return (
        <Grid.Cell>
            <Link to={`/camera/${encodeURIComponent(name.toLowerCase())}`}>
                <Player.Root ambientLights={false} sourceSet={[`${url}?d=${date}`]} index={0}>
                    <Player.Content rounded={'md'}>
                        <Player.Screen
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