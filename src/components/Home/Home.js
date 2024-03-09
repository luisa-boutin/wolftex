import React, { useState } from "react";
import LatexRenderer from "../LatexRenderer/LatexRenderer";
import "./Home.css";

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
      <div className="my-5">
        <div id="greeting-card" className="text-center">
          <div className="container py-5">
            <h1 className="display-3">
              <span className="wolf">Wolf</span>
              <span className="tex">TeX</span>.js
            </h1>
            <p className="m-5">Breve descritivo sobre a aplicação.</p>
            <div className="input-group">
              <input
                type="text"
                id="wolframInput"
                className="form-control holder"
                placeholder="Wolfram code"
                aria-label="Wolfram code"
                aria-describedby="button-translate"
                value={inputValue}
                onChange={handleInputChange}
              />
              <div className="input-group-append">
                <button
                  className="btn"
                  type="button"
                  id="button-translate"
                  onClick={handleButtonClick}>
                  Traduzir
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <LatexRenderer latexCode={latexCode} />
    </div>
  );
};

export default Home;
