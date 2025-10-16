// src/qubit/interpreter/interpreter.ts
import {
    Assign,
    Binary,
    Expr,
    Grouping,
    Literal,
    Unary,
    Variable,
    Visitor
} from '../parser/ast';
import { Token, TokenType } from '../lexer/token';
import { Environment } from './environment';

class RuntimeError extends Error {
    constructor(public token: Token, message: string) {
        super(message);
    }
}

export class Interpreter implements Visitor<any> {
    private environment = new Environment();

    interpret(expression: Expr): any {
        try {
            const value = this.evaluate(expression);
            return value;
        } catch (error) {
            // In a real implementation, you'd want to report this error to the user.
            // For now, we'll just log it.
            console.error(error);
            return null;
        }
    }

    visitLiteralExpr(expr: Literal): any {
        return expr.value;
    }

    visitGroupingExpr(expr: Grouping): any {
        return this.evaluate(expr.expression);
    }

    visitUnaryExpr(expr: Unary): any {
        const right = this.evaluate(expr.right);

        switch (expr.operator.type) {
            case TokenType.MINUS:
                this.checkNumberOperand(expr.operator, right);
                return -Number(right);
            case TokenType.BANG:
                return !this.isTruthy(right);
        }

        // Unreachable.
        return null;
    }

    visitBinaryExpr(expr: Binary): any {
        const left = this.evaluate(expr.left);
        const right = this.evaluate(expr.right);

        switch (expr.operator.type) {
            case TokenType.GREATER:
                this.checkNumberOperands(expr.operator, left, right);
                return Number(left) > Number(right);
            case TokenType.GREATER_EQUAL:
                this.checkNumberOperands(expr.operator, left, right);
                return Number(left) >= Number(right);
            case TokenType.LESS:
                this.checkNumberOperands(expr.operator, left, right);
                return Number(left) < Number(right);
            case TokenType.LESS_EQUAL:
                this.checkNumberOperands(expr.operator, left, right);
                return Number(left) <= Number(right);
            case TokenType.BANG_EQUAL: return !this.isEqual(left, right);
            case TokenType.EQUAL_EQUAL: return this.isEqual(left, right);
            case TokenType.MINUS:
                this.checkNumberOperands(expr.operator, left, right);
                return Number(left) - Number(right);
            case TokenType.PLUS:
                if (typeof left === 'number' && typeof right === 'number') {
                    return left + right;
                }
                if (typeof left === 'string' && typeof right === 'string') {
                    return left + right;
                }
                throw new RuntimeError(expr.operator, "Operands must be two numbers or two strings.");
            case TokenType.SLASH:
                this.checkNumberOperands(expr.operator, left, right);
                return Number(left) / Number(right);
            case TokenType.STAR:
                this.checkNumberOperands(expr.operator, left, right);
                return Number(left) * Number(right);
        }

        // Unreachable.
        return null;
    }

    visitVariableExpr(expr: Variable): any {
        return this.environment.get(expr.name);
    }

    visitAssignExpr(expr: Assign): any {
        const value = this.evaluate(expr.value);
        this.environment.assign(expr.name, value);
        return value;
    }

    private evaluate(expr: Expr): any {
        return expr.accept(this);
    }

    private isTruthy(object: any): boolean {
        if (object === null) return false;
        if (typeof object === 'boolean') return object;
        return true;
    }

    private isEqual(a: any, b: any): boolean {
        if (a === null && b === null) return true;
        if (a === null) return false;
        return a === b;
    }

    private checkNumberOperand(operator: Token, operand: any): void {
        if (typeof operand === 'number') return;
        throw new RuntimeError(operator, "Operand must be a number.");
    }

    private checkNumberOperands(operator: Token, left: any, right: any): void {
        if (typeof left === 'number' && typeof right === 'number') return;
        throw new RuntimeError(operator, "Operands must be numbers.");
    }
}
