// Модули
import React, {useRef, useState} from "react";
import {NavLink} from "react-router-dom";
// Стили
import "./Header.css";

export default function Header() {
  // Состояние для отслеживания активной ссылки
  const [activeLink, setActiveLink] = useState("");
  const navRef = useRef(null);
  let scrollInterval = null;

  // Функция для установки активной ссылки
  const handleSetActiveLink = (link) => {
    setActiveLink(link);
  };

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

  // Функция для создания ссылки с установкой активного состояния
  const createNavLink = (to, text) => {
    return (
      <NavLink
        to={to}
        className={`link header__link ${activeLink === to ? "active" : ""}`}
        onClick={() => handleSetActiveLink(to)}
        key={to}
      >
        {text}
      </NavLink>
    );
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
          {createNavLink("/", "МКТ")}
          {createNavLink("/PP", "ПП")}
          {createNavLink("/MFP", "МФП")}
          {createNavLink("/DFP", "ДФП")}
          {createNavLink("/KP", "КП")}
          {createNavLink("/BP", "БП")}
          {createNavLink("/Report", "Отчёт")}
        </nav>
        <button
          className="scroll-button"
          onMouseEnter={() => handleScroll("right")}
          onMouseLeave={handleMouseLeave}
        >
          {">"}
        </button>
      </header>
    </>
  );
}
