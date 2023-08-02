import Navbar from "@client/components/Navbar"
import useViewStore from "@client/stores/viewStore";
import MapView from "@client/views/Map";
import GridView from "@client/views/Grid";
import { Views } from "@client/views/views";
import AboutView from "@client/views/About";
import CameraModal from "@client/components/modals/CameraModal";

function App() {
  const { view } = useViewStore();
  
  return (
    <>
      <Navbar />
        {
          view === Views.Map && <MapView />
        }
        {
          view === Views.Grid && <GridView />
        }
        {
          view === Views.About && <AboutView />
        }
      <CameraModal />
    </>
  )
}

export default App