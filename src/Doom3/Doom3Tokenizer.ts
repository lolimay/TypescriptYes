import { ETokenType, IDoom3Tokenizer, IDoom3Token } from './definitions';
import { Doom3Token } from './Doom3Token';

export class Doom3Tokenizer implements IDoom3Tokenizer {
    private _digits: Array<string> = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    private _whiteSpaces: Array<string> = [' ', '\t', '\n', '\v', '\r'];
    private _source: string;
    private _currentIndex!: number;
    private _current: IDoom3Token;

    private _isDigit(char: string): boolean {
        return this._digits.includes(char);
    }
    private _isWhiteSpaces(char: string):boolean {
        return this._whiteSpaces.includes(char);
    }
    private _getChar(): string {
        return this._source.charAt(this._currentIndex++);
    }
    private _peekChar(): string {
        return this._source.charAt(this._currentIndex);
    }
    private _ungetChar(): void {
        if (this._currentIndex>0) {
            this._currentIndex--;
        }
    }
    private _skipWhiteSpace(): string {
        let char: string = '';

        do {
            char = this._getChar();
        } while (!!char && this._isWhiteSpaces(char));
        return char;
    }
    private _skipSingleLineComments(): string {
        let char: string = '';

        do {
            char = this._getChar();
        } while (char.length > 0 && char !== '\n');
        return char; // 返回的是 '\n'
    }
    private _skipMultiLineComments(): string {
        let char: string = this._getChar();

        do {
            char = this._getChar();
        } while (char.length > 0 && (char !== '*' || this._peekChar() !== '/'));
        this._getChar(); // 吞掉末尾的 '/' 字符
        return char;
    }
    private _getNumber(token: Doom3Token): void {
        let value: number = 0.0;
        let isFloat: boolean = false;
        let scaleValue: number = 0.1;
        let char: string = this._getChar();
        let isNegate: boolean = char === '-';
        let consumed: boolean = false;
        do {
            token.addChar(char);
            if (char === '.') {
                isFloat = true;
            } else if (char !== '-') {
                let num: number = parseInt(char, 10);
                if (!isFloat) {
                    value = value*10 + num; // 整数
                } else {
                    value = value + scaleValue*num; // 小数
                    scaleValue *= 0.1;
                }
            }
            if (consumed === true) {
                this._getChar();
            }
            char = this._peekChar();
            consumed = true;
        } while (!!char && this._isDigit(char) || (!isFloat && char === '.'));
        if (isNegate) {
            value = -value;
        }
        token.setValue(value);
    }
    private _getSubString(token: Doom3Token, endChar: string): void {
        let end: boolean = false;
        let char: string = '';

        token.setType(ETokenType.STRING);
        do {
            char = this._getChar();
            if (char === endChar) {
                end = true;
            } else {
                token.addChar(char);
            }
        } while (char.length>0 && char !== '\n' && !end);
    }
    private _isSpecialChar(char: string): boolean {
        const specialChars = ['(', ')', '[', ']', '{', '}', ',', '.'];

        if (specialChars.includes(char)) {
            return true;
        }
        return false;
    }
    private _getString(token: Doom3Token): void {
        let char: string = this._getChar();

        token.setType(ETokenType.STRING);
        do {
            token.addChar(char);
            if (!this._isSpecialChar(char)) {
                char = this._getChar();
            }
        } while (
            char.length>0 && !this._isWhiteSpaces(char) && !this._isSpecialChar(char)
        );
    }
    private _getNextToken(tok: IDoom3Token): boolean {
        let token: Doom3Token = tok as Doom3Token;
        let char = '';

        token.reset();
        do {
            char = this._skipWhiteSpace();
            if (char === '/' && this._peekChar() === '/') {
                char = this._skipSingleLineComments();
            } else if (char === '/' && this._peekChar() === '*') {
                char = this._skipMultiLineComments();
            } else if (
                this._isDigit(char) || char === '-' ||
                (char === '.' && this._isDigit(this._peekChar()))
            ) {
                this._ungetChar();
                this._getNumber(token);
                return true;
            } else if (char === '"' || char === "'") {
                this._getSubString(token, char);
                return true;
            } else if (char.length>0) {
                this._ungetChar();
                this._getString(token);
                return true;
            }
        } while (char.length > 0);
        return false;
    }
    
    public constructor() {
        this._source = '';
        this._current = new Doom3Token();
        this.reset();
    }
    public get current(): IDoom3Token {
        return this._current;
    }
    public createIDoom3Token(): IDoom3Token {
        return new Doom3Token();
    }
    public setSource(source: string) {
        this._source = source;
        this.reset();
    }
    public reset(): void {
        this._currentIndex = 0;
    }
    public moveNext(): boolean {
        return this._getNextToken(this._current);
    }
}