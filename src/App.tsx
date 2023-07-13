import Navbar from "@/components/Navbar"
import useViewStore from "@/stores/viewStore";
import MapView from "@/views/Map";
import GridView from "@/views/Grid";
import { Views } from "@/views/views";

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
    </>
  )
}

export default App
