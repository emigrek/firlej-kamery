import Navbar from "@/components/Navbar"
import useViewStore from "@/stores/viewStore";
import MapView from "@/views/Map";
import GridView from "@/views/Grid";
import { Views } from "@/views/views";
import AboutView from "@/views/About";
import CameraModal from "@/components/modals/CameraModal";

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
