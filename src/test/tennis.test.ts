import {evaluateGameScore, evaluateSetScore, pointWonBy, score, resetAll} from '../tennis'

const manyPointsWon = (player: number, points: number) => {
  for (let i = 0; i < points; i++) {
    pointWonBy(player)
  }
}

afterEach(() => {
  resetAll();
});

describe('1 point won', () => {
  describe('By Player 1', () => {
    beforeEach(() => {
      const POINTS_WON = 1
      manyPointsWon(0, POINTS_WON)
    })
    
    test('Game score should be 15-0', () => {
      expect(evaluateGameScore()).toBe('15-0');
    });
    test('Set score should be 0-0', () => {
      expect(evaluateSetScore()).toBe('0-0');
    });
    test('Score function should return "0-0, 15-0"', () => {
      expect(score()).toBe('0-0, 15-0');
    });
  });
  
  describe('By Player 2', () => {
    beforeEach(() => {
      const POINTS_WON = 1
      manyPointsWon(1, POINTS_WON)
    })
    
    test('Game score should be 0-15', () => {
      expect(evaluateGameScore()).toBe('0-15');
    });
    test('Set score should be 0-0', () => {
      expect(evaluateSetScore()).toBe('0-0');
    });
    test('Score function should return "0-0, 0-15"', () => {
      expect(score()).toBe('0-0, 0-15');
    });
  });
});

describe('3 points won', () => {
  describe('By Player 1', () => {
    beforeEach(() => {
      const POINTS_WON = 3
      manyPointsWon(0, POINTS_WON)
    })

    test('Game score should be 40-0', () => {
      expect(evaluateGameScore()).toBe('40-0');
    });
    test('Set score should be 0-0', () => {
      expect(evaluateSetScore()).toBe('0-0');
    });
    test('Score function should return "0-0, 40-0"', () => {
      expect(score()).toBe('0-0, 40-0');
    });
  });

  describe('By Player 2', () => {
    beforeEach(() => {
      const POINTS_WON = 3
      manyPointsWon(1, POINTS_WON)
    })

    test('Game score should be 0-40', () => {
      expect(evaluateGameScore()).toBe('0-40');
    });
    test('Set score should be 0-0', () => {
      expect(evaluateSetScore()).toBe('0-0');
    });
    test('Score function should return "0-0, 0-40"', () => {
      expect(score()).toBe('0-0, 0-40');
    });
  });
});

describe('4 points won', () => {
  describe('By Player 1', () => {
    beforeEach(() => {
      const POINTS_WON = 4

      manyPointsWon(0, POINTS_WON)
    })

    test('Game score should be 0-0', () => {
      expect(evaluateGameScore()).toBe('0-0');
    })
    test('Set score should be 1-0', () => {
      expect(evaluateSetScore()).toBe('1-0');
    })
    test('Score function should return "1-0, 0-0"', () => {
      expect(score()).toBe('1-0, 0-0');
    });
  })

  describe('By Player 2', () => {
    beforeEach(() => {
      const POINTS_WON = 4

      manyPointsWon(1, POINTS_WON)
    })

    test('Game score should be 0-0', () => {
      expect(evaluateGameScore()).toBe('0-0');
    })
    test('Set score should be 0-1', () => {
      expect(evaluateSetScore()).toBe('0-1');
    })
    test('Score function should return "0-1, 0-0"', () => {
      expect(score()).toBe('0-1, 0-0');
    });
  })
})

describe('3 points won by Player 1 and Player 2', () => {
  beforeEach(()=>{
    const POINTS_WON = 3
    manyPointsWon(0, POINTS_WON)
    manyPointsWon(1, POINTS_WON)
  })

  test('Game score should be "Deuce"', () => {
    expect(evaluateGameScore()).toBe('Deuce');
  })

  describe('1 more point won by Player 1', () => {
    beforeEach(() => {
      const POINTS_WON = 1
      manyPointsWon(0, POINTS_WON)
    })

    test('Game score should be "Advantage Player 1"', () => {
      expect(evaluateGameScore()).toBe('Advantage Player 1');
    })

    describe('1 more point won by Player 2', () => {
      beforeEach(() => {
        const POINTS_WON = 1
        manyPointsWon(1, POINTS_WON)
      })

      test('Game score should be back to "Deuce"', () => {
        expect(evaluateGameScore()).toBe('Deuce');
      })
    })
  })
})
