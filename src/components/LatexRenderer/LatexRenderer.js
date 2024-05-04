import React, { useState } from "react";
import "katex/dist/katex.min.css";
import Latex from "react-latex";
import "./LatexRenderer.css";

const LatexRenderer = ({ mathematicaCode, latexCode }) => {
  const [tokens, setTokens] = useState([]);

  const wrappedLatexCode = `$$${latexCode}$$`;

  return (
    <div className="container-fluid">
      <div className="card-deck mb-3 text-center">
        <div className="card mb-4 col">
          <div className="card-header">
            <h4 className="my-0 font-weight-normal">Test Tokenizer</h4>
          </div>
          <div className="card-body">
            <h4>Tokens:</h4>
            <pre>{JSON.stringify(tokens, null, 2)}</pre>
          </div>
        </div>
      </div>
      <div className="card-deck mb-3 text-center">
        <div id="wolframDisplay" className="card mb-4 col">
          <div className="card-header">
            <h4 className="my-0 font-weight-normal">Input em Wolfram:</h4>
          </div>
          <div className="card-body">
            <h1 className="card-title pricing-card-title">
              <p className="lead">{mathematicaCode}</p>
            </h1>
          </div>
        </div>
        <div id="latexOutput" className="card mb-4 col">
          <div className="card-header">
            <h4 className="my-0 font-weight-normal">Output em LaTeX:</h4>
          </div>
          <div className="card-body">
            <h1 className="card-title pricing-card-title">
              <p className="lead">{latexCode}</p>
            </h1>
          </div>
        </div>
        <div id="latexRender" className="card mb-4 col">
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
      </div>
    </div>
  );
};

export default LatexRenderer;
