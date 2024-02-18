import React, { useState } from "react";
import LatexRenderer from "./Latex";

const Home = () => {
  const [inputValue, setInputValue] = useState("");
  const [latexCode, setLatexCode] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleButtonClick = () => {
    setLatexCode(inputValue);
  };

  return (
    <div>
      <div className="jumbotron">
        <div className="container">
          <h1 className="display-3">Wolftex.js</h1>
          <p>Breve descritivo sobre a aplicação.</p>

          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Wolfram code"
              aria-label="Wolfram code"
              aria-describedby="button-translate"
              value={inputValue}
              onChange={handleInputChange}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                id="button-translate"
                onClick={handleButtonClick}>
                Traduzir
              </button>
            </div>
          </div>
        </div>
      </div>
      <LatexRenderer latexCode={latexCode} />
    </div>
  );
};

export default Home;
