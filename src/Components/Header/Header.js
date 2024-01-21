import React from "react";
import {BrowserRouter as Link} from "react-router-dom";
import "./Header.css";

function Header() {
  return (
    <header>
      <nav>
        <Link to="/src/pages/MKT/MKT.js">
          <button>MKT</button>
        </Link>
      </nav>
    </header>
  );
}
export default Header;
