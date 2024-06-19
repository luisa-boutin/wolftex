const TokenType = {
  Number: "Number",
  Letter: "Letter",
  Whitespace: "Whitespace",
  GreekLetter: "GreekLetter",
  "=": "Equals",
  "+": "BasicSum",
  "-": "Subtraction",
  "/": "Division",
  "<": "LesserThan",
  ">": "GreaterThan",
  "<=": "LesserOrEqualThan",
  ">=": "GreaterOrEqualThan",
  "*": "Multiplication",
  "[": "LeftBracket",
  "]": "RightBracket",
  "{": "LeftCurlyBracket",
  "}": "RightCurlyBracket",
  "(": "LeftParenthesis",
  ")": "RightParenthesis",
  "^": "Caret",
  Sum: "Sum",
  Product: "Product",
  D: "PartialDerivative",
  Dt: "TotalDerivative",
  Limit: "Limit",
  Integrate: "Integrate",
  Factorial: "Factorial",
  Sin: "Sin",
  Cos: "Cos",
  Tan: "Tan",
  Sinh: "Sinh",
  Cosh: "Cosh",
  Arcsin: "Arcsin",
  Arccos: "Arccos",
  Arctan: "Arctan",
  Superscript: "Superscript",
  ",": "Comma",
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
