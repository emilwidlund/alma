module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    rootDir: './src',
    setupFiles: ['./setupTests.js', 'jest-webgl-canvas-mock']
};
