import React from "react";
import {BrowserRouter as Link} from "react-router-dom";
import "./Header.css";

function Header() {
  return (
    <header>
      <nav className="header__links">
        <Link to={"MKT"}>МКТ</Link>
        <a href="/src/pages/MKTPage/MKTPage.js" className="link header__link">
          МКТ
        </a>
        <a href="/" className="link header__link">
          ПП
        </a>
        <a href="/" className="link header__link">
          МФП
        </a>
        <a href="/" className="link header__link">
          ДФП
        </a>
      </nav>
    </header>
  );
}
export default Header;
