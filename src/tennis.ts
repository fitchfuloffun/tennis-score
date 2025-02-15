type GameScore = 0 | 15 | 30 | 40 | 'Advantage'
interface Player {
  setScore: number,
  gameScore: GameScore
}

const players: Player[] = [{
  setScore: 0,
  gameScore: 0
}, 
{
  setScore: 0,
  gameScore: 0
}]

export const evaluateGameScore = () => {
  return `${players[0].gameScore}-${players[1].gameScore}`
}

export const evaluateSetScore = () => {
  return `${players[0].setScore}-${players[1].setScore}`
}

export const score = (): string => {
  return `${evaluateSetScore()}, ${evaluateGameScore()}`;
}

export const pointWonBy = (player: number) => {
  players[player].gameScore = addGameScorePoint(player)
}

const addGameScorePoint = (player: number): GameScore => {
  switch (players[player].gameScore) {
    case 40:
      const opponent = player ? 0 : 1
      return players[opponent].gameScore === 40 ? 'Advantage' : addSetScorePoint(player)
    case 30:
      return 40
    case 15:
      return 30
    case 0:
      return 15
    default:
      return 0
  }
}

const addSetScorePoint = (player: number): GameScore => {
  players[player].setScore++
  resetGamePoints()

  return 0
}

const resetGamePoints = () => {
  players[0].gameScore = 0
  players[1].gameScore = 0
}

export const resetAll = () => {
  resetGamePoints()
  players[0].setScore = 0
  players[1].setScore = 0
}
