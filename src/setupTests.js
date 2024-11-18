// Import custom jest matchers from jest-dom
import '@testing-library/jest-dom';

// Mock matchMedia to prevent errors in tests
global.matchMedia = global.matchMedia || function() {
  return {
    matches: false,
    addListener: jest.fn(),
    removeListener: jest.fn(),
  };
};