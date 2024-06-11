import { Routes, Route } from "react-router-dom";
import { routes } from "./utilities/routes";
import Navbar from "./layouts/Navbar";
import Footer from "./layouts/Footer";

function App() {
  return (
    <div>
      <Navbar />
        <Routes>
          {routes.map((route, index) => (
            <Route
              path={route.path}
              element={<route.element />}
            />
          ))}
        </Routes>
      <Footer />
    </div>
  )
}

export default App;