import React, { useState } from "react";
import LatexRenderer from "../LatexRenderer/LatexRenderer";
import { translateMathematicaToLatex } from "../Parser/parser";

import "./Home.css";

const Home = () => {
  const [inputValue, setInputValue] = useState("");
  const [translatedLatex, setLatexCode] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleButtonClick = () => {
    const translatedLatex = translateMathematicaToLatex(inputValue);
    setLatexCode(translatedLatex);
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
      <LatexRenderer mathematicaCode={inputValue} latexCode={translatedLatex} />
    </div>
  );
};

export default Home;
