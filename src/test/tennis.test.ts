import {evaluateGameScore, evaluateSetScore, pointWonBy, score, resetAll} from '../tennis'

afterEach(() => {
  resetAll();
});


test('Point won by Player 1 - game score should be 15-0', () => {
  pointWonBy(0)
  expect(evaluateGameScore()).toBe('15-0');
});

test('3 points won by Player 1 - game score should be 40-0', () => {
  pointWonBy(0)
  pointWonBy(0)
  pointWonBy(0)
  expect(evaluateGameScore()).toBe('40-0');
});

describe('Game won by Player 1', () => {
  beforeEach(() => {
    pointWonBy(0)
    pointWonBy(0)
    pointWonBy(0)
    pointWonBy(0)
  })

  test('Game score should be 0-0', () => {
    expect(evaluateGameScore()).toBe('0-0');
  })
  test('Set score should be 1-0', () => {
    expect(evaluateSetScore()).toBe('1-0');
  })
})