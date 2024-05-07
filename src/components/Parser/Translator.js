export function convertTokensToLatex(tokens) {
  let output = "";
  let i = 0;

  while (i < tokens.length) {
    const token = tokens[i];
    if (!token) {
      break;
    }

    switch (token.type) {
      case "Number":
      case "Letter":
        output += token.value;
        break;
      case "Superscript":
        if (i + 1 < tokens.length) {
          const base = output.slice(-1);
          output = output.slice(0, -1); // Remove the base from the output
          const exponent = tokens[i + 1].value;
          output += `${base}^{${exponent}}`;
          i++; // Move past the exponent token
        }
        break;
      case "Integrate":
        i += 2; // skip 'Integrate' and the opening bracket '['
        let integrand = "";
        while (i < tokens.length && tokens[i].value !== "{") {
          if (tokens[i].type !== "Comma" && tokens[i].type !== "Whitespace") {
            integrand += tokens[i].value;
          }
          i++;
        }
        i++; // skip the opening curly bracket '{'
        let variable = tokens[i++].value; // first item is the variable
        i++; // skip the comma
        let lower = tokens[i++].value; // second item is the lower bound
        i++; // skip the comma
        let upper = tokens[i++].value; // third item is the upper bound
        i += 2; // skip '}' and ']'
        output += `\\int_{${lower}}^{${upper}} ${integrand} d${variable}`;
        break;
      case "D":
        // Simple derivative \frac{d}{dx}{expression}
        output += `\\frac{d}{d${tokens[i + 1].value}}{${tokens[i + 2].value}}`;
        i += 2; // Skip the variable and expression parts
        break;
      case "Sin":
      case "Cos":
        console.log(token.type);
        if (i + 1 < tokens.length && tokens[i + 1].value === "[") {
          let args = "";
          i += 2; // Move past the function name and '['
          while (i < tokens.length && tokens[i].value !== "]") {
            args += tokens[i].value;
            i++;
          }
          output += `\\${token.type.toLowerCase()}{${args}}`;
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
    i++;
  }
  return output;
}
