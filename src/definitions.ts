export enum ETokenType {
    NONE = 'NONE',
    STRING = 'STRING',
    NUMBER = 'NUMBER'
}

export interface IDoom3Token {
    readonly type: ETokenType;
    reset(): void;
    isString(str: string): boolean;
    getString(): string;
    getFloat(): number;
    getInt(): number;
}

export interface IDoom3Tokenizer {
    setSource(source: string): void;
    reset(): void;
    getNextToken(token: IDoom3Token): boolean;
}