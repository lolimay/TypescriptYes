module.exports = {
    roots: ['<rootDir>/__tests__'],
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
    testRegex: '(/.*|(\\.|/)(test|spec))\\.ts?$',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
}