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
    
    test('Game score should be "15-0"', () => {
      expect(evaluateGameScore()).toBe('15-0');
    });
    test('Set score should be "0-0"', () => {
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
    
    test('Game score should be "0-15"', () => {
      expect(evaluateGameScore()).toBe('0-15');
    });
    test('Set score should be "0-0"', () => {
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

    test('Game score should be "40-0"', () => {
      expect(evaluateGameScore()).toBe('40-0');
    });
    test('Set score should be "0-0"', () => {
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

    test('Game score should be "0-0"', () => {
      expect(evaluateGameScore()).toBe('0-0');
    })
    test('Set score should be "1-0"', () => {
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

    test('Game score should be "0-0"', () => {
      expect(evaluateGameScore()).toBe('0-0');
    })
    test('Set score should be "0-1"', () => {
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

    describe('1 more point won by Player 1', () => {
      beforeEach(() => {
        const POINTS_WON = 1
        manyPointsWon(0, POINTS_WON)
      })

      test('Game score should be "0-0"', () => {
        expect(evaluateGameScore()).toBe('0-0');
      })
      test('Set score should be "1-0"', () => {
        expect(evaluateSetScore()).toBe('1-0');
      })
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

describe('6 sets won', () => {
  describe('By Player 1', () => {
    describe('Uncontested', () => {
      beforeEach(() => {
        const SETS_WON = 6
        const POINTS_WON = SETS_WON * 4
        manyPointsWon(0, POINTS_WON)
      })

      test('Game score should be "0-0"', () => {
        expect(evaluateGameScore()).toBe('0-0');
      });
      test('Set score should be "6-0"', () => {
        expect(evaluateSetScore()).toBe('6-0');
      });
      test('Score function should return "6-0, 0-0, Winner is Player 1"', () => {
        expect(score()).toBe('6-0, 0-0, Winner is Player 1');
      });
    })

    describe('Opponent on 5 sets first', () => {
      beforeEach(() => {
        const SETS_WON_BY_OPPONENT = 5
        const POINTS_WON_BY_OPPONENT = SETS_WON_BY_OPPONENT * 4
        manyPointsWon(1, POINTS_WON_BY_OPPONENT)
        
        const SETS_WON = 6
        const POINTS_WON = SETS_WON * 4
        manyPointsWon(0, POINTS_WON)
      })

      test('Game score should be "0-0"', () => {
        expect(evaluateGameScore()).toBe('0-0');
      });
      test('Set score should be "6-5"', () => {
        expect(evaluateSetScore()).toBe('6-5');
      });
      test('Score function should return "6-5, 0-0"', () => {
        expect(score()).toBe('6-5, 0-0');
      });
    })
  })

  describe('By Player 2', () => {
    describe('Uncontested', () => {
      beforeEach(() => {
        const SETS_WON = 6
        const POINTS_WON = SETS_WON * 4
        manyPointsWon(1, POINTS_WON)
      })

      test('Game score should be "0-0"', () => {
        expect(evaluateGameScore()).toBe('0-0');
      });
      test('Set score should be "0-6"', () => {
        expect(evaluateSetScore()).toBe('0-6');
      });
      test('Score function should return "0-6, 0-0, Winner is Player 2"', () => {
        expect(score()).toBe('0-6, 0-0, Winner is Player 2');
      });
    })

    describe('Opponent on 5 sets first', () => {
      beforeEach(() => {
        const SETS_WON_BY_OPPONENT = 5
        const POINTS_WON_BY_OPPONENT = SETS_WON_BY_OPPONENT * 4
        manyPointsWon(0, POINTS_WON_BY_OPPONENT)
        
        const SETS_WON = 6
        const POINTS_WON = SETS_WON * 4
        manyPointsWon(1, POINTS_WON)
      })

      test('Game score should be "0-0"', () => {
        expect(evaluateGameScore()).toBe('0-0');
      });
      test('Set score should be "5-6"', () => {
        expect(evaluateSetScore()).toBe('5-6');
      });
      test('Score function should return "5-6, 0-0"', () => {
        expect(score()).toBe('5-6, 0-0');
      });
    })
  })
})

describe('Tie-Break', () => {
  describe('5 sets won by Player 1', () => {
    beforeEach(() => {
      const SETS_WON = 5
      const POINTS_WON = SETS_WON * 4
      manyPointsWon(0, POINTS_WON)
    })

    describe('6 sets won by Player 2', () => {
      beforeEach(() => {
        const SETS_WON = 6
        const POINTS_WON = SETS_WON * 4
        manyPointsWon(1, POINTS_WON)
      })

      describe('1 set won by Player 1', () => {
        beforeEach(() => {
          const SETS_WON = 1
          const POINTS_WON = SETS_WON * 4
          manyPointsWon(0, POINTS_WON)
        })

        test('Score function should return "6-6, 0-0"', () => {
          expect(score()).toBe('6-6, 0-0');
        });

        describe('7 points won by Player 1', () => {
          beforeEach(() => {
            const POINTS_WON = 7
            manyPointsWon(0, POINTS_WON)
          })

          test('Score function should return "7-6, 0-0, Winner is Player 1"', () => {
            expect(score()).toBe('7-6, 0-0, Winner is Player 1');
          });
        })

        describe('6 points won by Player 1', () => {
          beforeEach(() => {
            const POINTS_WON = 6
            manyPointsWon(0, POINTS_WON)
          })

          test('Score function should return "6-6, 6-0"', () => {
            expect(score()).toBe('6-6, 6-0');
          });

          describe('6 points won by Player 2', () => {
            beforeEach(() => {
              const POINTS_WON = 6
              manyPointsWon(1, POINTS_WON)
            })
  
            test('Score function should return "6-6, 6-6"', () => {
              expect(score()).toBe('6-6, 6-6');
            });

            describe('1 point won by Player 1', () => {
              beforeEach(() => {
                const POINTS_WON = 1
                manyPointsWon(0, POINTS_WON)
              })
    
              test('Score function should return "6-6, 7-6"', () => {
                expect(score()).toBe('6-6, 7-6');
              });

              describe('1 point won by Player 2', () => {
                beforeEach(() => {
                  const POINTS_WON = 1
                  manyPointsWon(1, POINTS_WON)
                })
      
                test('Score function should return "6-6, 7-7"', () => {
                  expect(score()).toBe('6-6, 7-7');
                });

                describe('2 points won by Player 2', () => {
                  beforeEach(() => {
                    const POINTS_WON = 2
                    manyPointsWon(1, POINTS_WON)
                  })
        
                  test('Score function should return "6-7, 0-0, Winner is Player 2"', () => {
                    expect(score()).toBe('6-7, 0-0, Winner is Player 2');
                  });
                })
              })
            })

            describe('2 points won by Player 1', () => {
              beforeEach(() => {
                const POINTS_WON = 2
                manyPointsWon(0, POINTS_WON)
              })
    
              test('Score function should return "7-6, 0-0, Winner is Player 1"', () => {
                expect(score()).toBe('7-6, 0-0, Winner is Player 1');
              });
            })
          })
        })
      })
    })
  })
})
