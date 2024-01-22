import React from "react";
import {Outlet, Route, Routes} from "react-router-dom";
import Header from "./Components/Header/Header";
import MKTPage from "./pages/MKTPage/MKTPage";
import PPPage from "./pages/PPPage/PPPage";
import MFPPage from "./pages/MFPPage/MFPPage";
import DFPPage from "./pages/DFP/DFPPage";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path={"/"} element={<Layout />}>
        <Route index element={<MKTPage />} />
        <Route path={"PP"} element={<PPPage />} />
        <Route path={"MFP"} element={<MFPPage />} />
        <Route path={"DFP"} element={<DFPPage />} />
      </Route>
    </Routes>
  );
}

function Layout() {
  <div className="App">
    <body>
      <Header />
      <main>
        <Outlet />
      </main>
    </body>
  </div>;
}

export default App;
