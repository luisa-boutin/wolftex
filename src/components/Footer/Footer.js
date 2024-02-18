import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="container">
      <footer className="footer-style d-flex flex-wrap justify-content-between align-items-center py-3 px-3 border-top fixed-bottom">
        <div className="footer-style col-md-4 d-flex align-items-center">
          <a
            href="/"
            className="mb-3 me-2 mb-md-0 text-body-secondary text-decoration-none lh-1">
            <i className="footer-style bi bi-bootstrap"></i>
          </a>
          <span className="footer-style mb-3 mb-md-0">&nbsp; Luisa Boutin</span>
        </div>

        <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
          <li className="ms-3">
            <a className="footer-style text-body-secondary" href="/">
              <i className="footer-style bi bi-twitter mx-2"></i>
            </a>
          </li>
          <li className="ms-3">
            <a className="footer-style text-body-secondary" href="/">
              <i className="footer-style bi bi-instagram mx-2"></i>
            </a>
          </li>
          <li className="ms-3">
            <a className="text-body-secondary" href="/">
              <i className="footer-style bi bi-facebook mx-2"></i>
            </a>
          </li>
        </ul>
      </footer>
    </div>
  );
};

export default Footer;
