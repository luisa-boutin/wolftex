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
      tokens.push(new Token(char, TokenType.Whitespace));
      current++;
      continue;
    }

    // Numbers
    if (/\d/.test(char)) {
      let value = "";
      while (/\d/.test(char) && current < input.length) {
        value += char;
        current++;
        if (current < input.length) {
          char = input[current];
        }
      }
      tokens.push(new Token(value, TokenType.Number));
      continue;
    }

    // Identifiers and specific keywords
    if (/[a-zA-Z]/.test(char)) {
      let value = "";
      while (/[a-zA-Z]/.test(char) && current < src.length) {
        value += char;
        current++;
        if (current < src.length) {
          char = src[current];
        }
      }
      switch (value) {
        case "Sin":
          tokens.push(new Token(value, TokenType.Sin));
          break;
        case "Cos":
          tokens.push(new Token(value, TokenType.Cos));
          break;
        case "Tan":
          tokens.push(new Token(value, TokenType.Tan));
          break;
        case "Log":
          tokens.push(new Token(value, TokenType.Log));
          break;
        case "Exp":
          tokens.push(new Token(value, TokenType.Exp));
          break;
        case "Integrate":
          tokens.push(new Token(value, TokenType.Integrate));
          break;
        default:
          tokens.push(new Token(value, TokenType.Identifier));
      }
      continue;
    }

    // Single character tokens
    switch (char) {
      case "+":
        tokens.push(new Token(char, TokenType.Sum));
        break;
      case "-":
        tokens.push(new Token(char, TokenType.Subtraction));
        break;
      case "/":
        tokens.push(new Token(char, TokenType.Division));
        break;
      case "*":
        tokens.push(new Token(char, TokenType.Multiplication));
        break;
      case "=":
        tokens.push(new Token(char, TokenType.Equals));
        break;
      case "<":
        tokens.push(new Token(char, TokenType.LesserThan));
        break;
      case ">":
        tokens.push(new Token(char, TokenType.GreaterThan));
        break;
      case "(":
        tokens.push(new Token(char, TokenType.OpenParenthesis));
        break;
      case ")":
        tokens.push(new Token(char, TokenType.CloseParenthesis));
        break;
      case "[":
        tokens.push(new Token(char, TokenType.OpenBracket));
        break;
      case "]":
        tokens.push(new Token(char, TokenType.CloseBracket));
        break;
      case "{":
        tokens.push(new Token(char, TokenType.OpenCurlyBracket));
        break;
      case "}":
        tokens.push(new Token(char, TokenType.CloseCurlyBracket));
        break;
      default:
        throw new Error(`Unexpected character: ${char}`);
    }
    current++;
  }

  return tokens;
}
