import React from "react";
import "katex/dist/katex.min.css";
import Latex from "react-latex";

const LatexRenderer = ({ latexCode }) => {
  return (
    <div>
      <div className="d-md-flex flex-md-equal w-100 my-md-3 pl-md-3">
        <div className="bg-dark mr-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center text-white overflow-hidden">
          <div className="my-3 py-3">
            <h2 className="display-5">Output em LaTeX:</h2>
            <p className="lead">{latexCode}</p>
          </div>
        </div>
        <div className="bg-light mr-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center overflow-hidden">
          <div className="my-3 p-3">
            <h2 className="display-5">LaTeX Renderizado:</h2>
            <p className="lead">
              <Latex>{latexCode}</Latex>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LatexRenderer;
