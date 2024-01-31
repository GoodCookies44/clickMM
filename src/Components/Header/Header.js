// Модули
import React from "react";
import {NavLink} from "react-router-dom";
// Стили
import "./Header.css";

export default function Header() {
  return (
    <>
      <header>
        <nav>
          <NavLink to={"/"} className="link header__link">
            МКТ
          </NavLink>
          <NavLink to={"/PP"} className="link header__link">
            ПП
          </NavLink>
          <NavLink to={"/MFP"} className="link header__link">
            МФП
          </NavLink>
          <NavLink to={"/DFP"} className="link header__link">
            ДФП
          </NavLink>
        </nav>
      </header>
    </>
  );
}
