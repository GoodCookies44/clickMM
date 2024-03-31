import React, {useEffect, useState} from "react";
import {NavLink} from "react-router-dom";
import SettingsButton from "../SettingsButton/SettingsButton";
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
        {to: "/UMF", label: "УМФ", active: false},
        {to: "/KP", label: "КП", active: false},
        {to: "/BP", label: "БП", active: false},
        {to: "/UsefulList", label: "Ссылки", active: false},
        {to: "/Report", label: "Отчёт", active: false},
      ]
    );
  });

  useEffect(() => {
    localStorage.setItem("activeLinks", JSON.stringify(activeLinks));
  }, [activeLinks]);

  const updateTabs = (updatedTabs) => {
    setActiveLinks(updatedTabs);
  };

  const handleLinkOrderChange = (dragIndex, hoverIndex) => {
    const updatedLinks = [...activeLinks];
    const draggedLink = updatedLinks[dragIndex];
    updatedLinks.splice(dragIndex, 1);
    updatedLinks.splice(hoverIndex, 0, draggedLink);
    setActiveLinks(updatedLinks);
  };

  return (
    <>
      <header>
        <nav>
          {activeLinks.map((link, index) =>
            link.active ? (
              <NavLink
                to={link.to}
                className={`link header__link`}
                key={link.to}
                draggable
                onDragStart={(e) => {
                  e.dataTransfer.setData("dragIndex", index);
                }}
                onDragOver={(e) => {
                  e.preventDefault();
                }}
                onDrop={(e) => {
                  const dragIndex = parseInt(e.dataTransfer.getData("dragIndex"));
                  const hoverIndex = index;
                  handleLinkOrderChange(dragIndex, hoverIndex);
                }}
              >
                {link.label}
              </NavLink>
            ) : null
          )}
        </nav>
        <SettingsButton updateTabs={updateTabs} activeLinks={activeLinks} />
      </header>
    </>
  );
}
