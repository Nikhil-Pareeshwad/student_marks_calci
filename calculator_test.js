const test = require('node:test');
const assert = require('node:assert');
const { processMarks } = require('./calculator_logic.js');

test('Valid marks calculation with passing status and decimals', () => {
  const result = processMarks([85.5, 90, 75]);
  
  assert.strictEqual(result.isValid, true);
  assert.strictEqual(result.total, 250.5);
  assert.strictEqual(result.percentage, 83.5);
  assert.strictEqual(result.status, 'PASSED');
});

test('Valid marks resulting in a failure (score below 35)', () => {
  const result = processMarks([30, 80, 90]);
  
  assert.strictEqual(result.isValid, true);
  assert.strictEqual(result.total, 200);
  assert.strictEqual(result.status, 'FAILED');
});

test('Exact passing mark boundary (35)', () => {
  const result = processMarks([35, 35, 35]);
  
  assert.strictEqual(result.isValid, true);
  assert.strictEqual(result.status, 'PASSED');
});

test('Invalid mark exceeding 100', () => {
  const result = processMarks([50, 105, 80]);
  
  assert.strictEqual(result.isValid, false);
  assert.match(result.error, /cannot exceed 100/);
});

test('Invalid negative mark', () => {
  const result = processMarks([50, -5, 80]);
  
  assert.strictEqual(result.isValid, false);
  assert.match(result.error, /cannot be negative/);
});

test('Invalid empty or missing input', () => {
  const result = processMarks([50, '', 80]);
  
  assert.strictEqual(result.isValid, false);
  assert.match(result.error, /empty/);
});

test('Invalid non-numeric input', () => {
  const result = processMarks([50, 'abc', 80]);
  
  assert.strictEqual(result.isValid, false);
  assert.match(result.error, /Invalid number/);
});