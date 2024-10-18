import React, {useEffect, useRef, useState} from "react";
import {NavLink} from "react-router-dom";
import SettingsButton from "../SettingsButton/SettingsButton";
import "./Header.css";

export default function Header() {
  const [activeLinks, setActiveLinks] = useState(() => {
    const storedLinks = JSON.parse(localStorage.getItem("activeLinks"));
    return (
      storedLinks || [
        {to: "/", label: "Категорийка", active: false},
        {to: "/PMPage", label: "ПМ/БП", active: false},
        {to: "/PaidPage", label: "Платная съёмка", active: false},
        {to: "/AdditionalPage", label: "Доп. услуги", active: false},
        {to: "/KaitenAPI", label: "Кайтен API", active: false},
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

  // Состояние для отслеживания активной ссылки
  const navRef = useRef(null);
  let scrollInterval = null;

  const handleScroll = (direction) => {
    if (navRef.current) {
      scrollInterval = setInterval(() => {
        if (direction === "left") {
          navRef.current.scrollLeft -= 5;
        } else if (direction === "right") {
          navRef.current.scrollLeft += 5;
        }
      }, 18);
    }
  };

  const handleMouseLeave = () => {
    clearInterval(scrollInterval);
  };

  return (
    <>
      <header>
        <button
          className="scroll-button"
          onMouseEnter={() => handleScroll("left")}
          onMouseLeave={handleMouseLeave}
        >
          {"<"}
        </button>

        <nav ref={navRef}>
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

        <button
          className="scroll-button"
          onMouseEnter={() => handleScroll("right")}
          onMouseLeave={handleMouseLeave}
        >
          {">"}
        </button>
        <SettingsButton updateTabs={updateTabs} activeLinks={activeLinks} />
      </header>
    </>
  );
}
