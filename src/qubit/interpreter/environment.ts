// src/qubit/interpreter/environment.ts
import { Token } from '../lexer/token';

class RuntimeError extends Error {
    constructor(public token: Token, message: string) {
        super(message);
    }
}

export class Environment {
    private readonly values: Map<string, any> = new Map();

    define(name: string, value: any): void {
        this.values.set(name, value);
    }

    get(name: Token): any {
        if (this.values.has(name.lexeme)) {
            return this.values.get(name.lexeme);
        }

        throw new RuntimeError(name, `Undefined variable '${name.lexeme}'.`);
    }

    assign(name: Token, value: any): void {
        if (this.values.has(name.lexeme)) {
            this.values.set(name.lexeme, value);
            return;
        }

        throw new RuntimeError(name, `Undefined variable '${name.lexeme}'.`);
    }
}
