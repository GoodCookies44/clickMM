import React from "react";
import {BrowserRouter as Link} from "react-router-dom";
import "./Header.css";

export default function Header() {
  return (
    <header>
      <div className="header__links">
        <Link to={"/src/pages/MKTPage/MKTPage.js"} className="link header__link">
          МКТ
        </Link>
        <Link to={"/src/pages/PPPage/PPPage.js"} className="link header__link">
          ПП
        </Link>
        <Link to={"/src/pages/MFPPage/MFPPage.js"} className="link header__link">
          МФП
        </Link>
        <Link to={"/src/pages/DFPPage/DFPPage.js"} className="link header__link">
          ДФП
        </Link>
      </div>
    </header>
  );
}
