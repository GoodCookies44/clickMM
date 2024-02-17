// Модули
import React from "react";
import {Outlet, Route, Routes} from "react-router-dom";
// Компоненты
import Header from "./components/Header/Header.js";
import MKTPage from "./pages/MKTPage/MKTPage.js";
import PPPage from "./pages/PPPage/PPPage.js";
import MFPPage from "./pages/MFPPage/MFPPage.js";
import DFPPage from "./pages/DFPPage/DFPPage.js";
import KPPage from "./pages/KPPage/KPPage.js";
import BPPage from "./pages/BPPage/BPPage.js";
import {CounterProvider} from "./components/Context/CounterContext.js";
// Стили
import "./App.css";

export default function App() {
  return (
    <Routes>
      <Route exact path={"/"} element={<Layout />}>
        <Route index element={<MKTPage />} />
        <Route path={"/PP"} element={<PPPage />} />
        <Route path={"/MFP"} element={<MFPPage />} />
        <Route path={"/DFP"} element={<DFPPage />} />
        <Route path={"/KP"} element={<KPPage />} />
        <Route path={"/BP"} element={<BPPage />} />
      </Route>
    </Routes>
  );
}

function Layout() {
  return (
    <div className="App">
      <Header />
      <main>
        <CounterProvider>
          <Outlet />
        </CounterProvider>
      </main>
    </div>
  );
}
