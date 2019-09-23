import { Doom3Tokenizer } from './Doom3Tokenizer';
import { Doom3Token } from './Doom3Token';
import { ETokenType } from './definitions';

const input: string = `
numMeshes 5
/*
 * joints 关键字定义了骨骼动画的 bindPose
 */
joints {
    "origin" -1 (0 0 0) (-0.5 -0.5 -0.5)
    "Body" 0 (-12.1038131714 0 79.004776001) (-0.5 -0.5 -0.5)
    // origin
}
`.trim();
const tokenizer = new Doom3Tokenizer();
const token = new Doom3Token();
tokenizer.setSource(input);

while (tokenizer.getNextToken(token)) {
    if (token.type === ETokenType.NUMBER) {
        console.log(`NUMBER: ${ token.getFloat() }`);
    } else {
        console.log(`STRING: ${ token.getString() }`);
    }
}