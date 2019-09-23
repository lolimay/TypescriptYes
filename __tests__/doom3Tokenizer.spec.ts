import { Doom3Tokenizer } from '../src/Doom3Tokenizer';
import { Doom3Token } from '../src/Doom3Token';

const str: string = `
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

test('special characters', () => {
    tokenizer.setSource(`  \t\n\v`);
    expect(tokenizer.getNextToken(token)).toBe(false);
})

test('digits', () => {
    tokenizer.setSource(`0.4`);
    expect(tokenizer.getNextToken(token)).toBe(true);
    console.log(token.getFloat());
    expect(token.getFloat()).toBe(0.4);
})