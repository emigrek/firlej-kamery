import Navbar from "@client/components/Navbar"
import { views } from "@client/views/views";
import CameraModal from "@client/components/modals/CameraModal";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NotFoundView from "./views/404";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {
          views.map(({ component, path }, index) => (
            <Route
              key={index}
              Component={component}
              path={path}
            />
          ))
        }
        <Route path="*" Component={NotFoundView} />
      </Routes>
      <CameraModal />
    </Router>
  )
}

export default App