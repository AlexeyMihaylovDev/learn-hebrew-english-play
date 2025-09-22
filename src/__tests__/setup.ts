import { vi } from 'vitest';

// Mock DOM environment
const mockSpeechSynthesis = {
  speak: vi.fn(),
  cancel: vi.fn(),
  pause: vi.fn(),
  resume: vi.fn(),
  getVoices: vi.fn(() => []),
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
};

// Mock window.speechSynthesis
Object.defineProperty(window, 'speechSynthesis', {
  value: mockSpeechSynthesis,
  writable: true,
});

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
  writable: true,
});

// Mock document.documentElement
Object.defineProperty(document, 'documentElement', {
  value: {
    setAttribute: vi.fn(),
    getAttribute: vi.fn(),
  },
  writable: true,
});


