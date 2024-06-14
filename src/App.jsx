import React from "react";
import RequireAuth from "./hooks/RequireAuth";
import { Routes, Route } from "react-router-dom";
import { routes } from "./utilities/routes";
import Container from "./layouts/Container";
import Navbar from "./layouts/Navbar";
import Footer from "./layouts/Footer";

function App() {
  return (
    <Routes>
      {routes.map((route, routeIndex) => (
        <React.Fragment key={routeIndex}>
          {route.path === "/" ||
           route.path === "/login" ||
           route.path === "/signup" ||
           route.path === "*" ? (
            <Route path={route.path} 
                  element={<>
                            <Navbar /> 
                            <route.element />
                            <Footer />
                           </>
                          } 
            />) : (
            <Route element={<RequireAuth/>}>
              <Route path={route.path} element={<Container page={route}/>} />
            </Route>
          )}
        </React.Fragment>
      ))}
    </Routes>
  )
}

export default App;