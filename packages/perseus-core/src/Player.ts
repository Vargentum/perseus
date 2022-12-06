import {dropRight} from 'lodash'
import {Entity} from './Entity'


export class Player extends Entity implements Player {

  public static START_HEALTH_POINTS = 30
  public static START_MANA_POINTS = 0
  public static MAX_MANA_POINTS = 10
  public static MAX_HAND_SIZE = 10

  private static findCardId(card: SomeCard, source: SomeCard[]): id | undefined {
    return source.find((c) => c.id === card.id)?.id
  }

  private static removeCardFrom(card: SomeCard, sources: SomeCard[][]): void {
    for (let i = 0; i < sources.length; i++) {
      let cardFoundInSourceId = Player.findCardId(card, sources[i])

      if (cardFoundInSourceId) {
        sources[i] = sources[i].filter((c) => c.id !== cardFoundInSourceId)
        break
      }
    }
  }

  healthPoints: number
  manaPoints: number
  hand: SomeCard[]
  battlefield: SomeCard[]
  graveyard: SomeCard[]
  deck: Deck

  constructor({name, deck}: PlayerConstructor) {
    super({name})
    this.healthPoints = Player.START_HEALTH_POINTS
    this.manaPoints = Player.START_MANA_POINTS
    
    this.deck = deck
    this.battlefield = []
    this.graveyard = []
    this.hand = []
  }

  restoreMana(manaPoints: number) {
    if (manaPoints > Player.MAX_MANA_POINTS) {
      this.manaPoints = Player.MAX_MANA_POINTS
    }
    else if (manaPoints < 0) {
      this.manaPoints = 0
    }
  }

  drawCard(card: SomeCard[] | SomeCard | number = 1): void {
    if (typeof card === 'number') {
      if (card < 1) {
        throw new Error('You can\'t draw less than 1 card')
      }
      let deck: SoulCard[] = []
      let hand: SomeCard[] = []

      this.deck.cards.forEach((c, index) => {
        (index < card) ? hand.push(c) : deck.push(c)
      })
      this.deck.cards = deck
      this.hand = hand
    }
    else if (Array.isArray(card)) {
      this.hand = this.hand.concat(card)
    }
    else {
      this.hand = this.hand.concat([card])
    }
  }

  playCard(card: SomeCard[] | SomeCard) {
    if (Array.isArray(card)) {
      card.forEach((c) => this.playCard(c))
    }
    else {
      this.battlefield = this.battlefield.concat([card])
      // card could be played from hand, graveyard or deck
      Player.removeCardFrom(card, [
        this.hand,
        this.graveyard,
        this.deck.cards,
      ])
    }
  }

  discardCard(card: SomeCard[] | SomeCard) {
    if (Array.isArray(card)) {
      card.forEach((c) => this.discardCard(c))
    }
    else {
      this.graveyard = this.graveyard.concat([card])
      // card could be discarded from hand, battlefield or deck
      Player.removeCardFrom(card, [
        this.hand,
        this.battlefield,
        this.deck.cards,
      ])
    }
  }
  
  takeDamage(damage: number) {
    if (damage > this.healthPoints) {
      this.die()
    }
    else {
      this.healthPoints -= damage
    }
  }

  die() {
    this.healthPoints = 0
  }
}