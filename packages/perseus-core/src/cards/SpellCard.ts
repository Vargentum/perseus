import {Card} from './Card'


export class SpellCard extends Card implements SpellCard {

  private body: SpellCardBody
  private validTargets: SpellCardTarget[]

  constructor({name, description, cost, body, validTargets}: SpellCardConstructor) {
    super({name, description, cost})
    this.body = body
    this.validTargets = validTargets
  }

  play(target: SpellCardTarget) {
    if (this.playable && this.isValidTarget(target)) {
      this.body(target) 
    }
  }

  change(body: SpellCardBody) {
    this.body = body
  }

  isValidTarget(target: SpellCardTarget) {
    return this.validTargets.some((t: any) => target instanceof t)
  }
}

// const fireball = new SpellCard({
//   name: 'Fireball',
//   description: "Test",
//   cost: 3,
//   validTargets: [Player, CreatureCard],
//   body: (target: Player) => {
//     target.takeDamage(3)
//   },
// })

// const bluePower = new SpellCard({
//   name: 'Blue Power', 
//   description: "Test",
//   cost: 2,
//   validTargets: [Player],
//   body: (target: Player) => {
//     target.drawCard(1)
//   }
// })

// const negeta = new SpellCard({
//   name: 'Negate',
//   description: "Test",
//   cost: 2,
//   validTargets: [SoulCard, CreatureCard, SpellCard],
//   body: (target: SoulCard | CreatureCard | SpellCard) => {
//     target.cancel()
//   }
// })

// // fireball.play(this.opponent)
// // this.player.discard(fireball)