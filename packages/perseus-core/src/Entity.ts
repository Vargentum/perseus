import {v4 as uuidv4} from 'uuid'

export default class Entity implements Entity {
  readonly id: id
  name: string
  description?: string

  constructor({name, description}: EntityConstructor) {
    this.id = uuidv4()
    this.name = name
    this.description = description
  }
}
