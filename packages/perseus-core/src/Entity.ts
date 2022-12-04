import {v4 as uuidv4} from 'uuid'

interface EntityMaterial {
  name: string,
  description?: string,
}

export default class Entity implements Entity {
  readonly id: string
  name: string
  description?: string

  constructor({name, description}: EntityMaterial) {
    this.id = uuidv4()
    this.name = name
    this.description = description
  }
}
