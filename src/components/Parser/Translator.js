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
        output += `\\frac{d}{d${tokens[i + 1].value}}{${tokens[i + 2].value}}`;
        i += 2; // Skip the variable and expression parts
        break;
      case "Sin":
      case "Cos":
      case "Tan":
      case "Arcsin":
      case "Arccos":
      case "Arctan":
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
    if (
      ["Cos", "Sin", "Tan", "Arccos", "Arcsin", "Arctan"].includes(
        tokens[i].type
      )
    ) {
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
  let integrandTokens = [];
  let variable, lower, upper;

  startIndex += 2; // Skip 'Integrate' and '['

  // Extract integrand tokens until the bounds start '{'
  while (startIndex < tokens.length && tokens[startIndex].value !== "{") {
    integrandTokens.push(tokens[startIndex]);
    startIndex++;
  }

  // Process the integrand tokens to handle any nested functions
  let integrand = convertFunctionTokensToIntegrand(integrandTokens);

  // Now handle the bounds
  startIndex++; // Skip the '{'
  variable = tokens[startIndex++].value;
  startIndex++; // Skip the comma

  lower = tokens[startIndex++].value;
  startIndex++; // Skip the comma

  upper = tokens[startIndex++].value;
  startIndex += 2; // Skip '}' and ']'

  output += `_{${lower}}^{${upper}} ${integrand} \\, d${variable}`;
  output = output.replace(/,\s*\\,/g, " ");

  return { formattedIntegral: output, newIndex: startIndex };
}

function convertFunctionTokensToIntegrand(tokens) {
  let output = "";
  let i = 0;
  while (i < tokens.length) {
    let token = tokens[i];
    if (token.type === "Cos" || token.type === "Sin" || token.type === "Tan") {
      // Correctly process nested functions recursively
      let nestedResult = handleNestedFunctions(tokens, i, token.type);
      output += nestedResult.formattedFunction;
      i = nestedResult.newIndex - 1; // Correct index adjustment
    } else {
      output += token.value;
    }
    i++;
  }
  return output;
}
