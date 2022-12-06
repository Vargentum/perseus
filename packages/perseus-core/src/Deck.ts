import {Entity} from './Entity'
import {SoulCard} from './cards/SoulCard'


export class Deck extends Entity implements Deck {

  private souls: DeckSoulsPerType
  cards: SoulCard[]

  constructor({name, souls}: DeckConstructor) {
    super({name})
    
    this.souls = souls
    this.cards = this.generateCards()
  }

  private generateCards(): SoulCard[] {
    let deck: SoulCard[] = []

    for (let type in this.souls) {
      for (let i = 0; i < this.souls[Soul[type as keyof typeof Soul]]; i++) {
        const soul = new SoulCard({
          name: 'Soul',
          description: 'A soul',
          rarity: Soul[type as keyof typeof Soul],
        })
        deck.push(soul)
      }
    }
    return deck
  }

  get length(): number {
    return this.cards.length
  }

  shuffle() {
    this.cards = this.cards.sort(() => Math.random() - 0.5)
  }

}