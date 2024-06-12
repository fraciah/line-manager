import React from "react";
import RequireAuth from "./hooks/RequireAuth";
import { Routes, Route } from "react-router-dom";
import { routes } from "./utilities/routes";
import Container from "./layouts/Container";

function App() {
  
  return (
    <Routes>
      {routes.map((route, routeIndex) => (
        <React.Fragment key={routeIndex}>
          {route.path === "/" ||
          route.path === "/login" ||
          route.path === "/signup" ||
          route.path === "*" ? (
            <Route path={route.path} element={<route.element />} />
          ) :      (
            <Route element={<RequireAuth/>}>
              <Route path={route.path} element={<Container page={route}/>} />
            </Route>
          )
          }
        </React.Fragment>
      ))}
    </Routes>
  )
}

export default App;