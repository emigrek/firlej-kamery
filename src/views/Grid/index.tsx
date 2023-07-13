import cameras from '@/cameras'
import CameraCell from '@/components/CameraCell'
import Grid from '@/components/Grid'
import { FC } from 'react'

const GridView: FC = () => {
    return (
        <Grid>
            {
                cameras.map((camera, index) => (
                    <CameraCell key={index} {...camera} />
                ))
            }
        </Grid>
    )
}

export default GridView