import React, { useState } from "react";
import LatexRenderer from "../LatexRenderer/LatexRenderer";
import { tokenize } from "../Parser/Tokenizer";
import { convertTokensToLatex } from "../Parser/Translator";
import "./Home.css";

const Home = () => {
  const [translatedLatex, setLatexCode] = useState("");
  const [input, setInput] = useState("");
  const [tokens, setTokens] = useState([]);

  const handleInputChange = (event) => {
    const newText = event.target.value;
    setInput(newText);
    const newTokens = tokenize(newText);
    setTokens(newTokens);
  };

  const handleButtonClick = () => {
    const translatedLatex = convertTokensToLatex(tokens);
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
                value={input}
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
      <LatexRenderer mathematicaCode={input} latexCode={translatedLatex} />
    </div>
  );
};

export default Home;
