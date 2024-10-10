// Модули
import React from "react";
import {Outlet, Route, Routes} from "react-router-dom";
// Компоненты
import Header from "./components/Header/Header.js";
import CategoricalPage from "./pages/CategoricalPage/CategoricalPage.js";
import PMPage from "./pages/PMPage/PMPage.js";
import PaidPage from "./pages/PaidPage/PaidPage.js";
import AdditionalPage from "./pages/AdditionalPage/AdditionalPage.js";
import KaitenAPIPage from "./pages/KaitenAPIPage/KaitenAPIPage.js";
import ReportPage from "./pages/ReportPage/ReportPage.js";
import {CounterProvider} from "./components/Context/CounterContext.js";
import {SettingsProvider} from "./components/Context/SettingsContext.js";
// Стили
import "./App.css";

export default function App() {
  return (
    <Routes>
      <Route exact path={"/"} element={<Layout />}>
        <Route index element={<CategoricalPage />} />
        <Route path={"/PMPage"} element={<PMPage />} />
        <Route path={"/PaidPage"} element={<PaidPage />} />
        <Route path={"/AdditionalPage"} element={<AdditionalPage />} />
        <Route path={"/KaitenAPI"} element={<KaitenAPIPage />} />
        <Route path={"/Report"} element={<ReportPage />} />;
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
