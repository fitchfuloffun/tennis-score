type GameScoreDisplay = 0 | 15 | 30 | 40 | 'Advantage'
interface Player {
  setScore: number,
  gameScore: number
}

const players: Player[] = [{
  setScore: 0,
  gameScore: 0
}, 
{
  setScore: 0,
  gameScore: 0
}]

let winner: number = -1
let tieBreak: Boolean = false

export const evaluateGameScore = () => {
  if (players[0].gameScore >= 3 && players[1].gameScore >= 3) {
    if (players[0].gameScore === players[1].gameScore) return "Deuce"
  }

  const gameScoreDisplays = [
    getGameScoreDisplay(0),
    getGameScoreDisplay(1)
  ]

  const playerWithAdvantage = gameScoreDisplays.findIndex((score) => score === "Advantage")
  if (playerWithAdvantage !== -1) return `Advantage Player ${playerWithAdvantage+1}`

  return `${gameScoreDisplays[0]}-${gameScoreDisplays[1]}`
}

export const evaluateSetScore = () => {
  return `${players[0].setScore}-${players[1].setScore}`
}

export const score = (): string => {
  const winnerString = winner >= 0 ? `, Winner is Player ${winner+1}` : ""

  return `${evaluateSetScore()}, ${evaluateGameScore()}${winnerString}`;
}

export const pointWonBy = (player: number) => {
  players[player].gameScore = addGameScorePoint(player)
}

const getOpponent = (player: number) => player === 0 ? 1 : 0

const addGameScorePoint = (player: number): number => {
  const opponent = getOpponent(player)

  players[player].gameScore++

  if (tieBreak) {
    console.log(players[player].gameScore)
    if(players[player].gameScore >= 7) {
      if (players[player].gameScore - players[opponent].gameScore >= 2) return addSetScorePoint(player)
    }

    return players[player].gameScore
  }

  if (players[player].gameScore > 3) {
    if (players[player].gameScore - players[opponent].gameScore >= 2) return addSetScorePoint(player)
  }

  return players[player].gameScore
}

const getGameScoreDisplay = (player: number): GameScoreDisplay | number => {
  const playerGameScore = players[player].gameScore
  if (tieBreak) return playerGameScore

  const opponent = getOpponent(player)

  if (players[opponent].gameScore >= 3 && playerGameScore > players[opponent].gameScore) return "Advantage"

  switch (playerGameScore) {
    case 0:
      return 0
    case 1:
      return 15
    case 2:
      return 30
    case 3:
      return 40
    default:
      return 0
  }
}

const addSetScorePoint = (player: number): number => {
  players[player].setScore++
  resetGamePoints()
  checkForWinner(player)

  return 0
}

const checkForWinner = (player: number) => {
  const opponent = getOpponent(player)
  checkForTieBreak()

  if (tieBreak && players[player].setScore >= 7) winner = player
  if (players[player].setScore >= 6 && players[opponent].setScore < 5) winner = player
}

const checkForTieBreak = () => {
  if (players[0].setScore === 6 && players[1].setScore === 6) tieBreak = true
}

const resetGamePoints = () => {
  players[0].gameScore = 0
  players[1].gameScore = 0
}

export const resetAll = () => {
  resetGamePoints()
  players[0].setScore = 0
  players[1].setScore = 0
  winner = -1
  tieBreak = false
}
