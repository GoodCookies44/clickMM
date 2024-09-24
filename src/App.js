// Модули
import React from "react";
import {Outlet, Route, Routes} from "react-router-dom";
// Компоненты
import Header from "./components/Header/Header.js";
import MKTPage from "./pages/MKTPage/MKTPage.js";
import PPPage from "./pages/PPPage/PPPage.js";
import UMFPage from "./pages/UMFPage/UMFPage.js";
import KPPage from "./pages/KPPage/KPPage.js";
import BPPage from "./pages/BPPage/BPPage.js";
import UsefulList from "./pages/UsefulList/UsefulList.js";
import ReportPage from "./pages/ReportPage/ReportPage.js";
import CategoryPage from "./pages/CategoryPage/CategoryPage.js";
import KaitenPage from "./pages/KaitenPage/KaitenPage.js";
import SheetPage from "./pages/SheetPage/SheetPage.js";
import {CounterProvider} from "./components/Context/CounterContext.js";
import {SettingsProvider} from "./components/Context/SettingsContext.js";
// Стили
import "./App.css";

export default function App() {
  return (
    <Routes>
      <Route exact path={"/"} element={<Layout />}>
        <Route index element={<UsefulList />} />
        <Route path={"/MKT"} element={<MKTPage />} />
        <Route path={"/PP"} element={<PPPage />} />
        <Route path={"/UMF"} element={<UMFPage />} />
        <Route path={"/KP"} element={<KPPage />} />
        <Route path={"/BP"} element={<BPPage />} />
        <Route path={"/Report"} element={<ReportPage />} />
        <Route path={"/CategoryPage"} element={<CategoryPage />} />
        <Route path={"/KaitenPage"} element={<KaitenPage />} />
        <Route path={"/Sheet"} element={<SheetPage />} />
      </Route>
    </Routes>
  );
}

function Layout() {
  return (
    <div className="App">
      <CounterProvider>
        <SettingsProvider>
          <Header />
          <main>
            <Outlet />
          </main>
        </SettingsProvider>
      </CounterProvider>
    </div>
  );
}
