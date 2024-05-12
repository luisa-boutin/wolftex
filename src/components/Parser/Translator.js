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
        output += integralResult.formattedIntegral;
        i = integralResult.newIndex - 1;
        break;
      case "TotalDerivative":
      case "PartialDerivative":
        const derivativeResult = handleDerivativeFormatting(tokens, i);
        output += derivativeResult.formattedDerivative;
        i = derivativeResult.newIndex - 1;
        break;
      case "Sin":
      case "Cos":
      case "Sinh":
      case "Cosh":
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
      case "Limit":
        const limitResult = handleLimitFormatting(tokens, i);
        output += limitResult.formattedLimit;
        i = limitResult.newIndex - 1;
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

  // Handle the bounds
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
    // TODO: If the subtype of the token is a function, refactor this if statement
    // if ( token.subtype === "Function")
    if (token.type === "Cos" || token.type === "Sin" || token.type === "Tan") {
      let nestedResult = handleNestedFunctions(tokens, i, token.type);
      output += nestedResult.formattedFunction;
      i = nestedResult.newIndex - 1;
    } else {
      output += token.value;
    }
    i++;
  }
  return output;
}

function handleDerivativeFormatting(tokens, startIndex) {
  let output = "";
  let derivativeType = tokens[startIndex].type;
  let variable, expression;

  startIndex += 2; // Skip 'D' or 'Dt' and '['

  // Extract expression tokens until the comma
  let expressionTokens = [];
  while (startIndex < tokens.length && tokens[startIndex].value !== ",") {
    expressionTokens.push(tokens[startIndex]);
    startIndex++;
  }

  // Skip the comma
  startIndex++;

  // The next token should be the variable of derivation
  if (startIndex < tokens.length) {
    variable = tokens[startIndex].value;
    startIndex++; // Move past the variable
  }

  expression = convertFunctionTokensToIntegrand(expressionTokens);

  let derivativeSymbol =
    derivativeType === "TotalDerivative" ? "d" : "\\partial";

  output = `\\frac{${derivativeSymbol} ${expression}}{${derivativeSymbol} ${variable}}`;

  startIndex++;

  return { formattedDerivative: output, newIndex: startIndex };
}

function handleLimitFormatting(tokens, startIndex) {
  let output = "\\lim\\limits";
  let variable, approach, expression;

  startIndex += 2; // Skip 'Limit' and '['

  // Extract expression tokens until the first comma
  let expressionTokens = [];
  while (startIndex < tokens.length && tokens[startIndex].value !== ",") {
    expressionTokens.push(tokens[startIndex]);
    startIndex++;
  }

  // Skip the comma to get to the variable
  startIndex++;

  if (startIndex < tokens.length) {
    variable = tokens[startIndex].value;
    startIndex++; // Move past the variable
  }

  // Skip the next comma to get to the approach
  startIndex++;

  if (startIndex < tokens.length) {
    approach = tokens[startIndex].value;
    if (approach.toLowerCase() === "infinity") {
      approach = "\\infty";
    }
    startIndex++;
  }

  // Move past the closing ']'
  startIndex++;

  if (expressionTokens.length > 0) {
    expression = convertFunctionTokensToIntegrand(expressionTokens);
  } else {
    expression = "";
  }

  output += `_{${variable} \\to ${approach}} ${expression}`;

  return { formattedLimit: output, newIndex: startIndex };
}
