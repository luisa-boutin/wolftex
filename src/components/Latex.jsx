import React from "react";
import "katex/dist/katex.min.css";
import Latex from "react-latex";

const LatexRenderer = ({ latexCode }) => {
  return (
    <div className="container-fluid">
      <div className="card-deck mb-3 text-center">
        <div id="latexOutput" class="card mb-4 box-shadow">
          <div class="card-header">
            <h4 class="my-0 font-weight-normal">Output em LaTeX:</h4>
          </div>
          <div class="card-body">
            <h1 class="card-title pricing-card-title">
              <p className="lead">{latexCode}</p>
            </h1>
          </div>
        </div>
        <div id="latexRender" class="card mb-4 box-shadow">
          <div class="card-header">
            <h4 class="my-0 font-weight-normal">LaTeX Renderizado:</h4>
          </div>
          <div class="card-body">
            <h1 class="card-title pricing-card-title">
              <p className="lead">
                <Latex>{latexCode}</Latex>
              </p>
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LatexRenderer;
