import React, { useState, useEffect } from "react";
import "./Navbar.css";

const Navbar = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  const changeTheme = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    document.body.dataset.theme = theme;
  }, [theme]);

  return (
    <nav className="navbar fixed-top navbar-expand-lg px-3">
      <a className="navbar-brand" href="/">
        WolfTex.js
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item active">
            <a className="nav-link" href="/">
              Home
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/about">
              Sobre
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/contact">
              Contato
            </a>
          </li>
        </ul>
        <div className="ms-auto">
          <ul className="navbar-nav">
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="/"
                id="navbarDropdownMenuLink"
                role="button"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false">
                <i className="bi bi-palette"></i>&nbsp; Temas
              </a>
              <div
                className="dropdown-menu"
                aria-labelledby="navbarDropdownMenuLink">
                <button
                  className="dropdown-item"
                  onClick={() => changeTheme("light")}>
                  <i className="bi bi-sun"></i>&nbsp; Claro
                </button>
                <button
                  className="dropdown-item"
                  onClick={() => changeTheme("dark")}>
                  <i className="bi bi-moon-stars"></i>&nbsp; Escuro
                </button>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
