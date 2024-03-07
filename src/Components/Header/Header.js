// Модули
import React, {useEffect, useState} from "react";
import {NavLink} from "react-router-dom";
// Компоненты
import SettingsButton from "../SettingsButton/SettingsButton";
// Стили
import "./Header.css";

export default function Header() {
  const [activeLinks, setActiveLinks] = useState(() => {
    const storedLinks = JSON.parse(localStorage.getItem("activeLinks"));
    return (
      storedLinks || [
        {to: "/", label: "МКТ", active: false},
        {to: "/PP", label: "ПП", active: false},
        {to: "/MFP", label: "МФП", active: false},
        {to: "/DFP", label: "ДФП", active: false},
        {to: "/KP", label: "КП", active: false},
        {to: "/BP", label: "БП", active: false},
        {to: "/UsefulLinks", label: "Ссылки", active: false},
      ]
    );
  });

  useEffect(() => {
    localStorage.setItem("activeLinks", JSON.stringify(activeLinks));
  }, [activeLinks]);

  const updateTabs = (updatedTabs) => {
    setActiveLinks(updatedTabs);
  };

  return (
    <>
      <header>
        <nav>
          {activeLinks.map((link) =>
            link.active ? (
              <NavLink to={link.to} className={`link header__link`} key={link.to}>
                {link.label}
              </NavLink>
            ) : null
          )}
          <NavLink to="/Report" className={`link header__link`} key="/Report">
            Отчёт
          </NavLink>
        </nav>
        <SettingsButton
          updateTabs={updateTabs}
          activeLinks={activeLinks.filter((link) => link.to !== "/Report")}
        />
      </header>
    </>
  );
}
