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
        output += handleIntegralFormatting(tokens, i);
        i += findClosingCurly(tokens, i + 1); // Move to the end of the integral expression
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
  startIndex += 2; // Skip 'Integrate' and '['
  let integrand = "";
  while (tokens[startIndex].value !== "{") {
    integrand += tokens[startIndex].value;
    startIndex++;
  }
  startIndex++; // Skip '{'
  let variable = tokens[startIndex++].value;
  let lower = tokens[startIndex++].value;
  let upper = tokens[startIndex++].value;
  startIndex += 2; // Skip '}' and ']'
  return `${output}_{${lower}}^{${upper}} ${integrand} \\, d${variable}`;
}

function findClosingCurly(tokens, startIndex) {
  // Utility function to find the index of the closing curly bracket
  let depth = 0;
  for (let i = startIndex; i < tokens.length; i++) {
    if (tokens[i].value === "{") depth++;
    if (tokens[i].value === "}") {
      depth--;
      if (depth === 0) return i;
    }
  }
  return startIndex; // Return startIndex if no closing bracket found
}
