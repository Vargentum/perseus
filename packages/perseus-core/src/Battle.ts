import {random} from 'lodash'
import Deck from './Deck'
import Entity from './Entity'
import Player from './Player'


interface BattleMaterial {
  players: Player[],
}

class Battle extends Entity implements Battle {

  public static CARDS_PER_TURN = 1
  public static START_HAND_SIZE = 3 
  public static MIN_PLAYERS = 2

  readonly attackedFirstPlayer: Player
  private players: Player[]
  private effects: Effect[]
  private roundsTotal: number
  private attackedPlayersIds: string[]
  private attackingPlayer: Player
  private winner: Player | null = null

  constructor({players}: BattleMaterial) {
    if (players.length < Battle.MIN_PLAYERS) {
      throw new Error(`Battle requires at least ${Battle.MIN_PLAYERS} players`)
    }
    super({
      name: 'Battle',
      description: `A battle between ${players.length} players`,
    })
    this.players = players
    this.attackingPlayer = this.randomPlayer
    this.attackedFirstPlayer = this.attackingPlayer
    this.attackedPlayersIds = []

    this.effects = []
    this.roundsTotal = 0
  }

  private get randomPlayer(): Player {
    const randomIndex = random(0, this.players.length - 1)
    return this.players[randomIndex]
  }

  private get nextNonAttackedPlayer(): Player | undefined {
    return this.players.find((p) => 
      !this.attackedPlayersIds.includes(p.id)
    )
  }

  private get isFirstRound() {
    return this.roundsTotal === 1
  }


  startTurn(player: Player) {
    this.attackingPlayer = player

    let cardsToDraw = Battle.CARDS_PER_TURN

    if (this.isFirstRound) {
      if (player.id === this.attackedFirstPlayer.id) {
        cardsToDraw = Battle.START_HAND_SIZE
      }
      else {
        cardsToDraw += Battle.START_HAND_SIZE
      }
    }

    for (let i = 0; i < cardsToDraw; i++) {
      player.drawCard()
    }
    
    player.restoreMana(this.roundsTotal)
  }

  endTurn(playerId: string) {
    this.attackedPlayersIds.push(playerId)
    
    if (this.nextNonAttackedPlayer) {
      this.startTurn(this.nextNonAttackedPlayer)
    } 
    else {
      this.endRound()
    }
  }

  startRound() {
    this.roundsTotal++
    this.startTurn(this.attackingPlayer)
  }

  endRound() {
    this.attackedPlayersIds = []
    this.startTurn(this.attackedFirstPlayer)
  }

  start() {
    this.startRound()
  }

  end() {
    // this.activePlayer = null
  }
}

const souls = {
  [Soul.Common]: 15,
  [Soul.Talent]: 7,
  [Soul.Hero]: 5,
  [Soul.Legend]: 3,
}

// const battle = new Battle({
//   players: [
//     new Player({
//       name: 'Player 1', 
//       deck: new Deck({name: 'Player\'s 1 deck', souls})
//     }),
//     new Player({
//       name: 'Player 2', 
//       deck: new Deck({name: 'Player\'s 2 deck', souls})
//     }),
//   ],
// })

// battle.startTurn(playerId)
// battle.endTurn()
// battle.end()