import { FC } from 'react'
import cameras from '@shared/cameras'

import Grid from '@client/components/ui/Grid'
import CameraPreview from '@client/components/CameraPreview'

const GridView: FC = () => {
    return (
        <Grid>
            {
                cameras.map((camera, index) => (
                    <Grid.Cell key={index}>
                        <CameraPreview camera={camera} />
                    </Grid.Cell>
                ))
            }
        </Grid>
    )
}

export default GridView