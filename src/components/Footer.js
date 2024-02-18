import React from "react";

const Footer = () => {
  return (
    <div className="container">
      <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top fixed-bottom">
        <div className="col-md-4 d-flex align-items-center">
          <a
            href="/"
            className="mb-3 me-2 mb-md-0 text-body-secondary text-decoration-none lh-1">
            <i className="bi bi-bootstrap" style={{ fontSize: "24px" }}></i>
          </a>
          <span className="mb-3 mb-md-0 text-body-secondary">
            &nbsp; Luisa Boutin
          </span>
        </div>

        <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
          <li className="ms-3">
            <a className="text-body-secondary" href="/">
              <i
                className="bi bi-twitter mx-2"
                style={{ fontSize: "24px" }}></i>
            </a>
          </li>
          <li className="ms-3">
            <a className="text-body-secondary" href="/">
              <i
                className="bi bi-instagram mx-2"
                style={{ fontSize: "24px" }}></i>
            </a>
          </li>
          <li className="ms-3">
            <a className="text-body-secondary" href="/">
              <i
                className="bi bi-facebook mx-2"
                style={{ fontSize: "24px" }}></i>
            </a>
          </li>
        </ul>
      </footer>
    </div>
  );
};

export default Footer;
