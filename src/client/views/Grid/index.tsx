import { FC } from 'react'
import cameras from '@shared/cameras'

import { Link } from 'react-router-dom';
import Grid from '@client/components/ui/Grid'
import Snapshot from '@client/components/ui/Snapshot'

const GridView: FC = () => {
    return (
        <Grid>
            {
                cameras.map((camera, index) => (
                    <Grid.Cell key={index}>
                        <Link to={`/camera/${encodeURIComponent(camera.name.toLowerCase())}`}>
                            <Snapshot
                                className='cursor-pointer'
                                snapshot={{
                                    cameraId: camera.id,
                                    timestamp: Date.now(),
                                    url: camera.url,
                                    latest: true
                                }}
                                autoRefresh
                            />
                        </Link>
                    </Grid.Cell>
                ))
            }
        </Grid>
    )
}

export default GridView