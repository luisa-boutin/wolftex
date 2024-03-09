function tokenize(input) {
  return input.split(/(sqrt\[|\])/).filter((token) => token.trim() !== "");
}

function parse(tokens) {
  if (tokens[0] === "sqrt[" && tokens[tokens.length - 1] === "]") {
    return {
      type: "sqrt",
      expression: tokens.slice(1, tokens.length - 1).join(""),
    };
  }
}

function translate(parsed) {
  if (parsed.type === "sqrt") {
    return `\\sqrt{${parsed.expression}}`;
  }
}

export function translateMathematicaToLatex(input) {
  const tokens = tokenize(input);
  const parsed = parse(tokens);
  if (!parsed) {
    return "Input format not recognized";
  }
  return translate(parsed);
}
