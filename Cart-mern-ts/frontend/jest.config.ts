// Jest configuration file for a TypeScript React project
const jestConfig = {
  // Uses ts-jest preset, which enables Jest to work with TypeScript files
  preset: "ts-jest",
  // Simulates a browser-like environment using jsdom
  testEnvironment: "jsdom",

  // Specifies setup files that Jest should execute before running tests.
  // This file is typically used to configure React Testing Library or global test setups.
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],

  // Mocks CSS and SCSS imports to prevent errors when importing styles in components.
  // Jest doesn’t process CSS, so identity-obj-proxy helps resolve them as empty objects.
  moduleNameMapper: {
    "\\.(css|scss)$": "identity-obj-proxy", // Mocks CSS imports
  },

  // Specifies how Jest should transform TypeScript files.
  // ts-jest is used to compile TypeScript files before running tests.
  transform: {
    "^.+\\.tsx?$": "ts-jest", // Ensures TypeScript files are processed correctly
  },

  // Defines patterns for Jest to look for test files.
  testMatch: [
    "**/__tests__/**/*.[jt]s?(x)", // Matches test files inside __tests__ folder
    "**/?(*.)+(spec|test).[jt]s?(x)", // Matches *.test.tsx or *.spec.tsx files
  ],
};

export default jestConfig;
