import {dropRight} from 'lodash'
import Entity from './Entity'


export default class Player extends Entity implements Player {

  public static START_HEALTH_POINTS = 30
  public static START_MANA_POINTS = 0
  public static MAX_MANA_POINTS = 10
  public static MAX_HAND_SIZE = 10

  private static findCardIndex(card: SomeCard, source: SomeCard[]): number {
    return source.findIndex((c) => c.id === card.id)
  }

  private static removeCardFrom(card: SomeCard, sources: Array<SomeCard[]>): void {

    for (let i = 0; i < sources.length; i++) {
      let source = sources[i]
      let cardSourceIndex = Player.findCardIndex(card, source)
    
      if (cardSourceIndex !== -1) {
        source.splice(cardSourceIndex, 1)
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
      this.hand.push(...card)
    }
    else {
      this.hand.push(card)
    }
  }

  playCard(card: SomeCard) {
    this.battlefield.push(card) 

    Player.removeCardFrom(card, [
      this.hand,
      this.graveyard,
      this.deck.cards,
    ])
  }

  dropCard(card: SomeCard) {
    this.graveyard.push(card)

    Player.removeCardFrom(card, [
      this.hand,
      this.graveyard,
      this.battlefield,
      this.deck.cards,
    ])
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