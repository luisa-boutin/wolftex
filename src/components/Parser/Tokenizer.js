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
  D: "PartialDerivative",
  Dt: "TotalDerivative",
  Limit: "Limit",
  Integrate: "Integrate",
  Factorial: "Factorial",
  Sin: "Sin",
  Cos: "Cos",
  Tan: "Tan",
  Arcsin: "Arcsin",
  Arccos: "Arccos",
  Arctan: "Arctan",
  Superscript: "Superscript",
  Comma: "Comma",
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
  let unexpected = [];

  while (current < src.length) {
    let char = src[current];

    if (/\s/.test(char)) {
      current++;
      continue;
    }

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

    if (/[a-zA-Z]/.test(char)) {
      let value = "";
      while (/[a-zA-Z]/.test(char)) {
        value += char;
        current++;
        char = src[current] || "";
      }
      tokens.push(new Token(value, TokenType[value] || TokenType.Letter));
      continue;
    }

    if ("+-*/=<>()[{}]^,".includes(char)) {
      tokens.push(new Token(char, TokenType[char] || "Unknown"));
      current++;
      continue;
    }

    // Log unexpected characters instead of throwing an error
    unexpected.push(char);
    current++;
  }

  if (unexpected.length > 0) {
    console.warn("Unexpected characters ignored:", unexpected.join(""));
  }

  return tokens;
}
