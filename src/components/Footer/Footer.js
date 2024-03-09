import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer-style d-flex flex-wrap py-3 px-3 fixed-bottom">
      <div className="footer-style col-md-4 d-flex align-items-center">
        <a
          href="/"
          className="mb-3 me-2 mb-md-0 text-body-secondary text-decoration-none lh-1">
          <i className="footer-style bi bi bi-code-slash"></i>
        </a>
        <span className="footer-style mb-3 mb-md-0">&nbsp; Luisa Boutin</span>
      </div>
    </footer>
  );
};

export default Footer;
