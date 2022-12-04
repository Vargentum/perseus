import {random} from 'lodash'
import CreatureCard from './cards/CreatureCard'

interface ForgeMaterial {
  level: number,
  soul?: Soul,
}


export default class Forge {

  private static createRaces (material: ForgeMaterial): Race[] {
    let { soul } = material
    let racesToForge: Race[] = []
    let racesNames: string[] = Object.keys(Race)
    let racesToForgeTotal = 1

    if (soul === Soul.Hero || soul === Soul.Legend) {
      racesToForgeTotal = 2
    }

    for (let i = 0; i < racesToForgeTotal; i++) {
      let randomRaceIndex = random(0, racesNames.length - 1)
      let randomRaceName = racesNames[randomRaceIndex]
      racesToForge.push(Race[randomRaceName as keyof typeof Race])
      racesNames.splice(randomRaceIndex, 1)
    }
    return racesToForge
  }

  private static createArchetype = (material: ForgeMaterial): Archetype => {
    let archetypeNames: string[] = Object.keys(Race)
    let randomArchetype = archetypeNames[random(0, archetypeNames.length - 1)]

    return Archetype[randomArchetype as keyof typeof Archetype]
  }

  private static createCreatureCardStats = (material: ForgeMaterial, archetype: Archetype): Pick<CreatureCard, "attackPoints" | "healthPoints"> => {
    let { level } = material
    let attackPoints = level
    let healthPoints = level

    switch (archetype) {
      case Archetype.Attacker:
        attackPoints *= 1.5
        healthPoints *= 0.5
        break
      case Archetype.Balanced:
        attackPoints *= 1
        healthPoints *= 1
        break
      case Archetype.Defender:
        attackPoints *= 0.5
        healthPoints *= 1
        break
    }

    return { attackPoints, healthPoints }
  }

  public static createCreatureCard (material: ForgeMaterial): CreatureCard {
    const {level, soul} = material

    if (level < 1) {
      throw new Error('Level must be greater than 0')
    }

    let name = `${soul} level ${level}`
    let description = `A creature with ${level} level and ${soul} soul`
    let archetype = Forge.createArchetype(material)
    let {attackPoints, healthPoints} = Forge.createCreatureCardStats(material, archetype)
    let races = Forge.createRaces(material)

    return new CreatureCard({
      name, 
      description, 
      cost: level, 
      attackPoints, 
      healthPoints, 
      archetype,
      races,
    })
  }
}