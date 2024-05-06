/** @type {import('ts-jest').JestConfigWithTsJest} */
// module.exports = {
//   preset: 'ts-jest',
//   testEnvironment: 'node',
// };

export default {
  preset:"ts-jest",
  testEnvironment:"node",
  testMatch: [
    '**/*.test.ts' // Solo ejecutar archivos .test.ts
  ],
}