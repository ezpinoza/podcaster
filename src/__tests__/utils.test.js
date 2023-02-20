import { render, fireEvent } from '@testing-library/react';
import { convertMillisecondsToTime, convertDate } from '../utils/utils.js';

describe('convertDate', () => {
  test('converts a date object to "21/02/2023"', () => {
    const date = new Date('2023-02-21T00:00:00Z');
    expect(convertDate(date)).toBe('21/02/2023');
  });

  test('converts a string to "01/01/2023"', () => {
    const dateString = '2023-01-01';
    expect(convertDate(dateString)).toBe('01/01/2023');
  });
});

describe('convertMillisecondsToTime', () => {
  test('converts 60000 milliseconds to "00:01:00"', () => {
    expect(convertMillisecondsToTime(60000)).toBe('00:01:00');
  });

  test('converts 3600000 milliseconds to "01:00:00"', () => {
    expect(convertMillisecondsToTime(3600000)).toBe('01:00:00');
  });

  test('converts 3661000 milliseconds to "01:01:01"', () => {
    expect(convertMillisecondsToTime(3661000)).toBe('01:01:01');
  });
});