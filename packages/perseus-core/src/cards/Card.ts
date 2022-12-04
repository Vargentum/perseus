import {v4 as uuidv4} from 'uuid'
import Entity from '../Entity'

export default class Card extends Entity implements Card {
  
  protected playable: boolean = true
  protected initialCost: number
  cost: number

  constructor({name, description, cost}: CardConstructor) {
    super({name, description})
    this.cost = cost
    this.initialCost = cost
  }

  cancel() {
    this.playable = false
  }

  restoreInitialCost() {
    this.cost = this.initialCost
  }

}