export enum ETokenType {
    NONE = 'NONE',
    STRING = 'STRING',
    NUMBER = 'NUMBER'
}
export interface IEnumerator<T> {
    /**
     * 将迭代器重置为初始位置
     */
    reset(): void;
    /**
     * 如果没越界，moveNext 将 current 设置为下一个元素，并返回 true；
     * 如果已越界，moveNext 返回 false。
     */
    moveNext(): boolean;
    readonly current: T;
}

export interface IDoom3Token {
    readonly type: ETokenType;
    reset(): void;
    isString(str: string): boolean;
    getString(): string;
    getFloat(): number;
    getInt(): number;
}

export interface IDoom3Tokenizer extends IEnumerator<IDoom3Token> {
    setSource(source: string): void;
}

export interface HTTPResponse {
    success: boolean;
    responseType: XMLHttpRequestResponseType;
    response: any;
}