import { v4 as uuidv4 } from 'uuid'
import {Card} from './Card'

export class CreatureCard extends Card implements CreatureCard {

  public static BASE_ATTACK_MODIFIER = 1
  public static BASE_HEALTH_MODIFIER = 1

  archetype: Archetype
  cost: number
  attackPoints: number
  healthPoints: number
  races: Race[]

  constructor(
    {name, description, cost, attackPoints, healthPoints, archetype, races}
    : CreatureCardConstructor
  ) {
    super({name, description, cost})

    this.cost = cost
    this.attackPoints = attackPoints
    this.healthPoints = healthPoints
    this.archetype = archetype
    this.races = races
  }

  setAttribute(attribute: string, valueSetter: <T>(t: T) => T) {
    if (!this.hasOwnProperty(attribute)) {
      throw new Error(`Invalid attribute ${attribute}`)
    }
    let value = this[attribute as keyof typeof this]
    this[attribute as keyof typeof this] = valueSetter(value)
  }

  attack(target: CreatureCard | Player) {
    target.takeDamage(this.attackPoints)
  }
  
  block(target: CreatureCard) {
    this.attack(target)
    this.takeDamage(target.attackPoints)
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

  kill(target: CreatureCard) {
    target.die()
  }

  // get couldAttack() {
  //   return true
  // }

  // get couldBlock() {
  //   return true
  // }

  // get alive() {
  //   return this.healthPoints > 0
  // }
}


// const troll = new CreatureCard({
//   name: 'Troll',
//   description: 'A big and strong creature',
//   cost: 3,
//   attackPoints: 3,
//   healthPoints: 3,
//   archetype: Archetype.Attacker,
//   races: [Race.Troll],
// })