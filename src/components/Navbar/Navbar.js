import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import "./Navbar.css";

const Navbar = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const { i18n } = useTranslation();
  const { t } = useTranslation();

  const changeTheme = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
  };

  useEffect(() => {
    document.body.dataset.theme = theme;
  }, [theme]);

  return (
    <nav className="navbar fixed-top navbar-expand-lg px-3">
      <a className="navbar-brand" href="/">
        <span id="wolf">Wolf</span>
        <span className="tex">Tex</span>.js
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
              {t("btn-home")}
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/about">
              {t("btn-about")}
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/contact">
              {t("btn-contact")}
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
                <i className="bi bi-palette"></i>&nbsp; {t("btn-themes")}
              </a>
              <div
                className="dropdown-menu"
                aria-labelledby="navbarDropdownMenuLink">
                <button
                  className="dropdown-item"
                  onClick={() => changeTheme("light")}>
                  <i className="bi bi-sun"></i>&nbsp; {t("theme-light")}
                </button>
                <button
                  className="dropdown-item"
                  onClick={() => changeTheme("dark")}>
                  <i className="bi bi-moon-stars"></i>&nbsp; {t("theme-dark")}
                </button>
              </div>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="/"
                id="navbarDropdownLanguageLink"
                role="button"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false">
                <i className="bi bi-translate"></i>&nbsp; {t("btn-translate")}
              </a>
              <div
                className="dropdown-menu"
                aria-labelledby="navbarDropdownLanguageLink">
                <button
                  className="dropdown-item"
                  onClick={() => changeLanguage("en")}>
                  English
                </button>
                <button
                  className="dropdown-item"
                  onClick={() => changeLanguage("pt")}>
                  Português
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
