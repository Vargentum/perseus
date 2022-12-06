import {Card, CreatureCard, SpellCard} from '../cards'
// import Forge from '../Forge'
import {Player} from '../Player'

interface SoulMaterial {
  name: string,
  description: string,
  rarity: Soul,
}

export class SoulCard extends Card implements SoulCard {

  readonly rarity: Soul

  protected sealed: boolean = true
  protected card: CreatureCard | SpellCard | null = null

  private unsealWith(creatureCard: CreatureCard | SpellCard) {
    this.card = creatureCard
    this.sealed = false
  }
  
  constructor({name, description, rarity}: SoulMaterial) {
    super({name, description, cost: 0})

    this.rarity = rarity
  }

  playAsCreatureCard(cost: number): CreatureCard {
    if (!this.playable) {
      throw new Error('Soul is not playable')
    }
    if (this.sealed) {
      this.unsealWith(
        new CreatureCard({
          name: 'Troll',
          description: 'A troll',
          cost,
          attackPoints: cost,
          healthPoints: cost,
          archetype: Archetype.Attacker,
          races: [Race.Troll],
        })
      )
    }
    return this.card as CreatureCard
  }

  playAsSpellCard(cost: number): SpellCard {
    if (!this.playable) {
      throw new Error('Soul is not playable')
    }
    if (this.sealed) {
      this.unsealWith(
        new SpellCard({
          name: 'Fireball',
          description: `'A burst of fire that deals ${cost} damage to creature or player`,
          cost,
          validTargets: [Player, CreatureCard],
          body: (target: Player | CreatureCard) => {
            target.takeDamage(cost)
          }
        })
      )
    }
    return this.card as SpellCard
  }
}
