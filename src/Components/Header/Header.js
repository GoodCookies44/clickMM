import React from "react";
import {BrowserRouter as Link} from "react-router-dom";
import "./Header.css";

function Header() {
  return (
    <header>
      <nav className="header__links">
        <Link to={"MKT"} className="link header__link">
          МКТ
        </Link>
        <Link to={"PP"} className="link header__link">
          ПП
        </Link>
        <Link to={"MFP"} className="link header__link">
          МФП
        </Link>
        <Link to={"DFP"} className="link header__link">
          ДФП
        </Link>
      </nav>
    </header>
  );
}
export default Header;
