const TokenType = {
  Number: "Number",
  Letter: "Letter",
  Whitespace: "Whitespace",
  GreekLetter: "GreekLetter",
  Equals: "Equals",
  Sum: "Sum",
  Subtraction: "Subtraction",
  Division: "Division",
  LesserThan: "LesserThan",
  GreaterThan: "GreaterThan",
  LesserOrEqualThan: "LesserOrEqualThan",
  GreaterOrEqualThan: "GreaterOrEqualThan",
  Multiplication: "Multiplication",
  OpenParenthesis: "OpenParenthesis",
  CloseParenthesis: "CloseParenthesis",
  OpenBracket: "OpenBracket",
  CloseBracket: "CloseBracket",
  OpenCurlyBracket: "OpenCurlyBracket",
  CloseCurlyBracket: "CloseCurlyBracket",
  PartialDerivative: "PartialDerivative",
  TotalDerivative: "TotalDerivative",
  Limit: "Limit",
  Integral: "Integral",
  Factorial: "Factorial",
  Sin: "Sin",
  Cos: "Cos",
  Tan: "Tan",
  Arcsin: "Arcsin",
  Arccos: "Arccos",
  Arctan: "Arctan",
  Superscript: "Superscript",
};

export class Token {
  constructor(value, type) {
    this.value = value;
    this.type = type;
  }
}

export function tokenize(input) {
  let current = 0;
  let tokens = [];
  const src = input.split("");

  while (current < src.length) {
    let char = src[current];

    // Skip whitespace
    if (/\s/.test(char)) {
      current++;
      continue;
    }

    // Handle numbers
    if (/\d/.test(char)) {
      let value = "";
      while (/\d/.test(char)) {
        value += char;
        current++;
        char = src[current] || "";
      }
      tokens.push(new Token(value, TokenType.Number));
      continue;
    }

    // Handle identifiers (variables and functions)
    if (/[a-zA-Z]/.test(char)) {
      let value = "";
      while (/[a-zA-Z]/.test(char)) {
        value += char;
        current++;
        char = src[current] || "";
      }
      switch (value) {
        case "Sin":
        case "Cos":
        case "Tan":
        case "Log":
        case "Exp":
        case "Integrate":
          tokens.push(new Token(value, TokenType[value]));
          break;
        default:
          tokens.push(new Token(value, TokenType.Letter));
      }
      continue;
    }

    // Handle single character tokens including the superscript '^'
    if ("+-*/=<>()[{}]^".includes(char)) {
      tokens.push(
        new Token(char, TokenType[char === "^" ? "Superscript" : char])
      );
      current++;
      continue;
    }

    throw new Error(`Unexpected character: ${char}`);
  }

  return tokens;
}
