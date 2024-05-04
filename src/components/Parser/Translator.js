export function convertTokensToLatex(tokens) {
  let output = "";
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    if (!token) {
      continue;
    }

    switch (token.type) {
      case "Number":
      case "Letter":
        output += token.value;
        break;
      case "Sin":
      case "Cos":
        // Check if there are enough tokens ahead to form a valid function call
        if (
          i + 3 < tokens.length &&
          tokens[i + 1].type === "OpenBracket" &&
          tokens[i + 3].type === "CloseBracket"
        ) {
          // Skip the next three tokens as they are part of this function
          output += `\\${token.type.toLowerCase()}{${tokens[i + 2].value}}`;
          i += 3;
        } else {
          output += `\\${token.type.toLowerCase()}{}`;
        }
        break;
      case "Sum":
        output += "+";
        break;
      case "Subtraction":
        output += "-";
        break;
      case "Multiplication":
        output += `\\cdot`;
        break;
      case "Division":
        output += `\\div`;
        break;
      case "Equals":
        output += "=";
        break;
      case "OpenParenthesis":
        output += "(";
        break;
      case "CloseParenthesis":
        output += ")";
        break;
      case "OpenBracket":
      case "CloseBracket":
      case "OpenCurlyBracket":
      case "CloseCurlyBracket":
        break;
      default:
        output += "";
    }
  }
  return output;
}
