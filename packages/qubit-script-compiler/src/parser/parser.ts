import { CstParser } from "chevrotain";
import { allTokens, Identifier, StringLiteral, LParen, RParen, Comma, Study, Plot, Equals, NumberLiteral } from "./tokens";

class QubitScriptParser extends CstParser {
  constructor() {
    super(allTokens);
    this.performSelfAnalysis();
  }

  // --- Entry Rule ---
  public script = this.RULE("script", () => {
    this.MANY(() => {
      this.SUBRULE(this.statement);
    });
  });

  // --- Statements ---
  private statement = this.RULE("statement", () => {
    this.OR([
      { ALT: () => this.SUBRULE(this.studyDeclaration) },
      { ALT: () => this.SUBRULE(this.variableDeclaration) },
      { ALT: () => this.SUBRULE(this.plotStatement) },
    ]);
  });

  private studyDeclaration = this.RULE("studyDeclaration", () => {
    this.CONSUME(Study);
    this.CONSUME(LParen);
    this.CONSUME(StringLiteral, { LABEL: "name" });
    this.CONSUME(RParen);
  });

  private plotStatement = this.RULE("plotStatement", () => {
    this.CONSUME(Plot);
    this.CONSUME(LParen);
    this.SUBRULE(this.expression, { LABEL: "argument" });
    this.CONSUME(RParen);
  });
  
  private variableDeclaration = this.RULE("variableDeclaration", () => {
    this.CONSUME(Identifier, { LABEL: "variable" });
    this.CONSUME(Equals);
    this.SUBRULE(this.expression, { LABEL: "value" });
  });

  // --- Expressions ---
  private expression = this.RULE("expression", () => {
    this.OR([
      { ALT: () => this.SUBRULE(this.functionCall) },
      { ALT: () => this.CONSUME(Identifier) },
      { ALT: () => this.CONSUME(NumberLiteral) },
      { ALT: () => this.CONSUME(StringLiteral) },
    ]);
  });

  private functionCall = this.RULE("functionCall", () => {
    this.CONSUME(Identifier, { LABEL: "functionName" });
    this.CONSUME(LParen);
    this.MANY_SEP({
      SEP: Comma,
      DEF: () => {
        this.SUBRULE(this.expression, { LABEL: "arguments" });
      }
    });
    this.CONSUME(RParen);
  });
}

export const parser = new QubitScriptParser();
