import { ETokenType, IDoom3Token } from './definitions';

export class Doom3Token implements IDoom3Token {
    private _type!: ETokenType; // definite assignment assertion
    private _charArray!: Array<string>;
    /**
     * If the token type is NUMBER, we assign its value
     * to _value, or ignore the member _value.
     */
    private _value!: number;

    public constructor() {
        this.reset();
    }
    public get type(): ETokenType {
        return this._type;
    }
    public reset() {
        this._type = ETokenType.NONE;
        this._charArray = [];
        this._value = 0.0;
    }
    public isString(str: string): boolean {
        let count: number = this._charArray.length;

        if (str.length !== count) {
            return false;
        }
        for (let i: number=0; i<count; i++) {
            if (this._charArray[i] !== str[i]) {
                return false;
            }
        }
        return true;
    }
    public getString(): string {
        return this._charArray.join('');
    }
    public getFloat(): number {
        return this._value;
    }
    public getInt(): number {
        return parseInt(this._value.toString(), 10);
    }
    // 非接口方法，供内部调用
    public addChar(char: string): void {
        this._charArray.push(char);
    }
    public setValue(num: number): void {
        this._value = num;
        this._type = ETokenType.NUMBER;
    }
    public setType(type: ETokenType): void {
        this._type = type;
    }
}