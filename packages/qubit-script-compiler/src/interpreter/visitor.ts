import { parser } from "../parser/parser";
import { DataSeries } from "@qubit-script-runtime/series";
import * as builtins from "@qubit-script-runtime/builtins";

const BaseCstVisitor = parser.getBaseCstVisitorConstructor();

class QubitScriptInterpreter extends BaseCstVisitor {
  private symbolTable: Map<string, any> = new Map();

  constructor() {
    super();
    this.validateVisitor();
    
    // Use the real DataSeries object with sample data
    this.symbolTable.set("close", new DataSeries([100, 101, 102, 103, 105, 106, 104, 103, 105, 107]));
  }

  script(ctx) {
    if (ctx.statement) {
      ctx.statement.forEach(stmt => this.visit(stmt));
    }
  }

  statement(ctx) {
    if (ctx.studyDeclaration) {
      this.visit(ctx.studyDeclaration);
    } else if (ctx.variableDeclaration) {
      this.visit(ctx.variableDeclaration);
    } else if (ctx.plotStatement) {
      this.visit(ctx.plotStatement);
    }
  }

  studyDeclaration(ctx) {
    const studyName = this.visit(ctx.name);
    console.log(`Initializing study: ${studyName}`);
  }

  variableDeclaration(ctx) {
    const varName = ctx.variable[0].image;
    const value = this.visit(ctx.value);
    console.log(`Assigning variable ${varName} =`, value);
    this.symbolTable.set(varName, value);
  }

  plotStatement(ctx) {
    const valueToPlot = this.visit(ctx.argument);
    console.log(`Plotting value:`, valueToPlot);
    // This would now pass a DataSeries object to the charting library
  }

  expression(ctx) {
    if (ctx.functionCall) {
      return this.visit(ctx.functionCall);
    } else if (ctx.Identifier) {
      const varName = ctx.Identifier[0].image;
      if (!this.symbolTable.has(varName)) {
        throw new Error(`Undefined variable: ${varName}`);
      }
      return this.symbolTable.get(varName);
    } else if (ctx.NumberLiteral) {
      return parseFloat(ctx.NumberLiteral[0].image);
    } else if (ctx.StringLiteral) {
      return ctx.StringLiteral[0].image.slice(1, -1);
    }
  }

  functionCall(ctx) {
    const funcName = ctx.functionName[0].image;
    const args = ctx.arguments ? ctx.arguments.map(arg => this.visit(arg)) : [];

    // Check if the function exists in our built-ins library
    if (funcName in builtins) {
      console.log(`Calling built-in function ${funcName} with args:`, args);
      return builtins[funcName](...args);
    } else {
      throw new Error(`Unknown function: ${funcName}`);
    }
  }
}

export const interpreter = new QubitScriptInterpreter();