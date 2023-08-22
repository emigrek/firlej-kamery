import { FC } from 'react'
import cameras from '@shared/cameras'

import { Link } from 'react-router-dom';
import Grid from '@client/components/ui/Grid'
import * as Player from "@client/components/ui/Player";

const GridView: FC = () => {
    return (
        <Grid>
            {
                cameras.map((camera, index) => (
                    <Grid.Cell key={index}>
                        <Link to={`/camera/${encodeURIComponent(camera.name.toLowerCase())}`}>
                            <Player.Root sourceSet={[camera.url]} index={0}>
                                <Player.Content className='overflow-hidden rounded-lg'>
                                    <Player.Screen size={'undefined'}/>
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