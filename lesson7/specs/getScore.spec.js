import { test, expect } from '@playwright/test';
import { getScore } from '../src/app.js';

test('getScore returns correct sum', () => {
  expect(getScore({ Anna: 10, Olga: 1, Ivan: 5 })).toBe(16);
});
