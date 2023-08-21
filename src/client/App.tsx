import Navbar from "@client/components/Navbar"
import { views } from "@client/views/views";
import CameraModal from "@client/components/drawers/CameraDrawer";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NotFoundView from "./views/404";
import { ReactNode } from "react";

function App() {
  return (
    <Router>
      <Navbar />
      <Wrapper>
        <RoutesList />
      </Wrapper>
      <CameraModal />
    </Router>
  )
}

function RoutesList() {
  return (
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
  )
}

function Wrapper({ children }: { children: ReactNode }) {
  return (
    <div vaul-drawer-wrapper="">
      {children}
    </div>
  )
}

export default App