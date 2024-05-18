import React, { useState } from "react";
import { tokenize } from "../Parser/Tokenizer";
import { convertTokensToLatex } from "../Parser/Translator";
import "./Home.css";
import "katex/dist/katex.min.css";
import Latex from "react-latex";

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

  const wrappedLatexCode = `$$${translatedLatex}$$`;

  return (
    <div>
      <div className="my-5">
        <div id="greeting-card" className="text-center intro-card">
          <div className="container py-5">
            <header>
              <h1 className="display-3">
                <span className="wolf">Wolf</span>
                <span className="tex">TeX</span>.js
              </h1>
            </header>
            <main>
              <p className="m-5">
                Insira sua expressão em Wolfram Mathematica no campo abaixo para
                obter a tradução para LaTeX.
              </p>
            </main>
            <div className="input-group">
              <input
                type="text"
                id="wolfram-input"
                className="form-control holder wolfram-input"
                placeholder="Wolfram code"
                aria-label="Wolfram code input"
                aria-describedby="button-translate"
                value={input}
                onChange={handleInputChange}
              />
              <button
                className="btn button-translate"
                type="button"
                id="button-translate"
                onClick={handleButtonClick}>
                Traduzir
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <div className="card-deck mb-3 text-center">
          <div id="wolfram-display" className="card mb-4 col">
            <div className="card-header">
              <h4 className="my-0 font-weight-normal">Input em Wolfram:</h4>
            </div>
            <div className="card-body">
              <h1 className="card-title pricing-card-title">
                <p className="lead">{input}</p>
              </h1>
            </div>
          </div>
          <div id="latex-output" className="card mb-4 col">
            <div className="card-header">
              <h4 className="my-0 font-weight-normal">Output em LaTeX:</h4>
            </div>
            <div className="card-body">
              <h1 className="card-title pricing-card-title">
                <p className="lead">{translatedLatex}</p>
              </h1>
            </div>
          </div>
          <div id="latex-render" className="card mb-4 col">
            <div className="card-header">
              <h4 className="my-0 font-weight-normal">LaTeX Renderizado:</h4>
            </div>
            <div className="card-body">
              <h1 className="card-title pricing-card-title">
                <p className="lead">
                  <Latex>{wrappedLatexCode}</Latex>
                </p>
              </h1>
            </div>
          </div>
          <div id="token-output" className="card mb-4 col">
            <div className="card-header">
              <h4 className="my-0 font-weight-normal text-center">
                Input tokenizado:
              </h4>
            </div>
            <div className="card-body">
              <h1 className="card-title pricing-card-title">
                <pre>{JSON.stringify(tokens, null, 2)}</pre>
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
