import { IDoom3Tokenizer } from './definitions';
import { Doom3Tokenizer } from './Doom3Tokenizer';
export class Doom3Factory {
    // 返回的是 IDoom3Tokenizer 接口，而不是实现类
    public static createDoom3Tokenizer(): IDoom3Tokenizer {
        return new Doom3Tokenizer();
    }
}