import { FC } from 'react'
import cameras from '@shared/cameras'

import Grid from '@client/components/ui/Grid'
import Camera from '@client/components/Camera'

const GridView: FC = () => {
    return (
        <Grid>
            {
                cameras.map((camera, index) => (
                    <Grid.Cell key={index}>
                        <Camera openModalOnClick camera={camera} />
                    </Grid.Cell>
                ))
            }
        </Grid>
    )
}

export default GridView