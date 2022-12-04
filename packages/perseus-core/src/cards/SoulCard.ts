import Card from './Card'
import CreatureCard from './CreatureCard'
import SpellCard from './SpellCard'

interface SoulMaterial {
  name: string,
  description: string,
  rarity: Soul,
}

export default class SoulCard extends Card implements SoulCard {

  readonly rarity: Soul
  
  constructor({name, description, rarity}: SoulMaterial) {
    super({name, description, cost: 0})

    this.rarity = rarity
  }

  // playAsCreatureCard(cost: number): CreatureCard {
  //   if (!this.playable) {
  //     throw new Error('Soul is not playable')
  //   }
  //   this.playable = false
  //   return new CreatureCard()
  // }

  // playAsSpellCard(cost: number): SpellCard {
  //   if (!this.playable) {
  //     throw new Error('Soul is not playable')
  //   }
  //   this.playable = false
  //   return new SpellCard(cost)
  // }
}
