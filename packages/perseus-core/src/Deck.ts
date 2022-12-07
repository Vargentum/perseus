import {sum} from 'lodash'
import {Entity} from './Entity'
import {CreatureCard, SpellCard} from './cards'
import { ForgeCreatureCard, ForgeSpellCard } from './Forge'

const rarityConfig = {
  [CardRarity.Common]: 10,
  [CardRarity.Talent]: 6,
  [CardRarity.Hero]: 4,
  [CardRarity.Legend]: 2,
}

const typeConfig = {
  [CardType.Creature]: 11,
  [CardType.Spell]: 11,
}

// type  ( CardRarity.Common / total)


export class Deck extends Entity implements Deck {

  readonly cardRarityConfig: DeckCardRarityConfig
  readonly cardTypeConfig: DeckCardTypeConfig
  readonly seed: number

  private readonly rarityTotal: number
  private readonly typeTotal: number
  private _cards: (CreatureCard | SpellCard)[] = []

  constructor({name, cardRarityConfig, cardTypeConfig, seed}: DeckConstructor) {
    super({name})

    this.cardRarityConfig = cardRarityConfig
    this.cardTypeConfig = cardTypeConfig
    this.rarityTotal = sum(Object.values(this.cardRarityConfig))
    this.typeTotal = sum(Object.values(this.cardTypeConfig))
    this.seed = seed

    this.validateConfig()
    this.generateCards()
  }

  private validateConfig(): void { 
    if (this.rarityTotal !== this.typeTotal) {
      throw new Error('Card rarity config values and card type config values must be equal')
    }
  }

  private generateCards(): void {
    for (let typeKey in this.cardTypeConfig) {
      let typeKeyTotal = this.cardTypeConfig[CardType[typeKey as keyof typeof CardType]]
      if (!typeKeyTotal) {
        continue
      }
      for (let rarityKey in this.cardRarityConfig) {
        let rarityKeyTotal = this.cardRarityConfig[CardRarity[rarityKey as keyof typeof CardRarity]]
        if (!rarityKeyTotal) {
          continue
        }
        let typeKeyRarityKeyTotal = Math.round(typeKeyTotal / this.typeTotal * rarityKeyTotal)

        for (let i = 0; i < typeKeyRarityKeyTotal; i++) {
          if (CardType[typeKey as keyof typeof CardType] === CardType.Creature) {
            let card = (
              new ForgeCreatureCard({
                level: i + 1,
                rarity: CardRarity[rarityKey as keyof typeof CardRarity],
              })
            ).forge()
            this._cards.push(card)
          }
          else if (CardType[typeKey as keyof typeof CardType] === CardType.Spell) {
            let card = (
              new ForgeSpellCard({
                level: i + 1,
                rarity: CardRarity[rarityKey as keyof typeof CardRarity],
              })
            ).forge()
            this._cards.push(card)
          }
          else {
            throw new Error(`The card type ${typeKey} is not supported`)
          }
        }
      }
    } 
  }

  get length(): number {
    return this._cards.length
  }

  shuffle() {
    this._cards = this._cards.sort(() => Math.random() - 0.5)
  }

  get cards() {
    return this._cards
  }

}