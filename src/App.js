import React from "react";
import {BrowserRouter, Outlet, Route, Routes} from "react-router-dom";
import Header from "./components/Header/Header.js";
import MKTPage from "./pages/MKTPage/MKTPage.js";
import PPPage from "./pages/PPPage/PPPage.js";
import MFPPage from "./pages/MFPPage/MFPPage.js";
import DFPPage from "./pages/DFPPage/DFPPage.js";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<Layout />}>
          <Route index element={<MKTPage />} />
          <Route path={"PP"} element={<PPPage />} />
          <Route path={"MFP"} element={<MFPPage />} />
          <Route path={"DFP"} element={<DFPPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

function Layout() {
  return (
    <div className="App">
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default App;
