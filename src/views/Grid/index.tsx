import { FC } from 'react'
import cameras from '@/cameras'

import Grid from '@/components/ui/Grid'
import Camera from '@/components/Camera'

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