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
        output += token.value;
        break;
      case "Integrate":
        const integralResult = handleIntegralFormatting(tokens, i);
        output += integralResult.formattedIntegral; // Use the LaTeX string
        i = integralResult.newIndex - 1; // Adjust the index properly
        break;
      case "D":
        // Simple derivative \frac{d}{dx}{expression}
        output += `\\frac{d}{d${tokens[i + 1].value}}{${tokens[i + 2].value}}`;
        i += 2; // Skip the variable and expression parts
        break;
      case "Sin":
      case "Cos":
        // Handle trigonometric functions with potential nested expressions
        let { formattedFunction, newIndex } = handleNestedFunctions(
          tokens,
          i,
          token.type
        );
        output += formattedFunction;
        i = newIndex - 1; // Adjust 'i' since handleNestedFunctions already advances it
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

function handleNestedFunctions(tokens, startIndex, funcType) {
  let args = "";
  let i = startIndex + 2; // Start right after the function name and '['
  while (i < tokens.length && tokens[i].value !== "]") {
    if (["Cos", "Sin", "Tan"].includes(tokens[i].type)) {
      let nestedResult = handleNestedFunctions(tokens, i, tokens[i].type);
      args += nestedResult.formattedFunction;
      i = nestedResult.newIndex;
    } else {
      args += tokens[i].value;
      i++;
    }
  }
  return {
    formattedFunction: `\\${funcType.toLowerCase()}{${args}}`,
    newIndex: i + 1, // Move past the closing ']'
  };
}

function handleIntegralFormatting(tokens, startIndex) {
  let output = "\\int";
  let integrand = "";
  let variable, lower, upper;

  startIndex += 2; // Skip 'Integrate' and '['

  // Capture the integrand until you reach '{', which starts the bounds
  while (startIndex < tokens.length && tokens[startIndex].value !== "{") {
    if (tokens[startIndex].value !== ",") {
      integrand += tokens[startIndex].value;
    }
    startIndex++;
  }

  // Now handle the bounds
  startIndex++; // Skip the '{'
  variable = tokens[startIndex++].value; // The first token after '{' is the variable
  startIndex++; // Skip the comma after the variable

  lower = tokens[startIndex++].value; // The next token is the lower bound
  startIndex++; // Skip the comma after the lower bound

  upper = tokens[startIndex++].value;

  // Correctly adjust for any tokens between the upper bound and the closing '}'
  while (tokens[startIndex].value !== "}") {
    startIndex++;
  }

  startIndex += 2; // Skip '}' and ']'

  output += `_{${lower}}^{${upper}} ${integrand} d${variable}`;

  return { formattedIntegral: output, newIndex: startIndex };
}
