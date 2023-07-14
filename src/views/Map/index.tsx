import { FC } from 'react'

import Map from "@/components/ui/Map"
import CameraModal from '@/components/modals/CameraModal'

const MapView: FC = () => {
  return (
    <>
      <Map />
      <CameraModal />
    </>
  )
}

export default MapView