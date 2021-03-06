import { useState } from 'react'

import Camera from '../components/Camera'

export default function Home() {
  const [cams] = useState([
    { id: 4 },
    { id: 10 },
    { id: 11 },
    { id: 12 }
  ]);

  return (
    <div className='bg-black overflow-x-hidden m-0 p-0'>
      <div className='w-screen h-screen flex flex-wrap items-center align-middle justify-center'>
        { cams.map((cam) => <Camera key={cam.id} id={cam.id}/> ) }
      </div>
    </div>
  )
}
