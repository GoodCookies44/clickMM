import React from "react";
import Header from "./components/Header/Header.js";
import MKTPage from "./pages/MKTPage/MKTPage.js";
import PPPage from "./pages/PPPage/PPPage.js";
import MFPPage from "./pages/MFPPage/MFPPage.js";
import DFPPage from "./pages/DFPPage/DFPPage.js";
import "./App.css";
import {Outlet, Route, Routes} from "react-router-dom";

export default function App() {
  return (
    <Routes>
      <Route exact path={"/"} element={<Layout />}>
        <Route index element={<MKTPage />} />
        <Route path={"/PP"} element={<PPPage />} />
        <Route path={"/MFP"} element={<MFPPage />} />
        <Route path={"/DFP"} element={<DFPPage />} />
      </Route>
    </Routes>
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
