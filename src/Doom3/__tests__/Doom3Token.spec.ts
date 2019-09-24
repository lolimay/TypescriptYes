import { Doom3Token } from '../src/Doom3Token';
import { ETokenType } from '../src/definitions';

const token = new Doom3Token();

test('setValue, getFloat and getInt should be work', () => {
    token.setValue(10.10);
    expect(typeof token.getFloat()).toBe('number');
    expect(token.getFloat().toString().split('').includes('.')).toBe(true);
    expect(token.getInt().toString().split('').includes('.')).toBe(false);
})

test('reset should be work', () => {
    token.setValue(10);
    token.setType(ETokenType.NUMBER);
    token.setValue(10.10);
    token.reset();
    expect(token.getFloat()).toBe(0);
    expect(token.getInt()).toBe(0);
    expect(token.getString()).toBe('');
    expect(token.type).toBe(ETokenType.NONE);
});
