import { FC } from 'react'
import cameras from '@shared/cameras'
import { Link } from 'react-router-dom';

import Grid from '@client/components/ui/Grid'
import * as Player from "@client/components/ui/Player";
import Loader from '@client/components/ui/Camera/loader';
import ImageError from '@client/components/ui/Camera/ImageError';

const GridView: FC = () => {
    return (
        <Grid>
            {
                cameras.map((camera, index) => (
                    <Grid.Cell key={index}>
                        <Link to={`/camera/${encodeURIComponent(camera.name.toLowerCase())}`}>
                            <Player.Root sourceSet={[camera.url]} index={0}>
                                <Player.Content className='overflow-hidden rounded-lg'>
                                    <Player.Screen
                                        className='bg-neutral-900'
                                        loadingComponent={<Loader />}
                                        errorComponent={<ImageError />}
                                    />
                                </Player.Content>
                            </Player.Root>
                        </Link>
                    </Grid.Cell>
                ))
            }
        </Grid>
    )
}

export default GridView