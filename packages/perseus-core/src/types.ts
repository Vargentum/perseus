enum Aura {
  Fast, // rogue
  FirstStrike, // rogue
  Flying, // mage
  Lifelink, // mage
  // Menace, // warrior
  Trample, // warior
  Vigilance,
}

enum Race {
  Angel,
  Demon,
  Dragon,
  Dwarf,
  Elf,
  Goblin,
  Human,
  Orc,
  Troll,
  Undead,
}

enum Archetype {
  Attacker,
  Balanced,
  Defender,
}

enum CardRarity {
  Common = 0,
  Hero = 2,
  Legend = 3,
  Talent = 1,
}

enum CardType {
  Creature,
  Spell,
}

interface EntityConstructor {
  name: string,
  description?: string,
}

interface Entity {
  id: id
  name: string
  description?: string
  new(constructor: EntityConstructor): Entity
}

interface Effect extends Entity {
  body: () => void
}

interface Player extends Entity {
  healthPoints: number
  manaPoints: number
  hand: SomeCard[]
  battlefield: SomeCard[]
  graveyard: SomeCard[]
  deck: Deck
  restoreMana(mana: number): void
  drawCard(card: SomeCard[] | SomeCard | number): void
  playCard(card: SomeCard): void
  discardCard(card: SomeCard): void
  takeDamage(damage: number): void
  die(): void
  new(constructor: PlayerConstructor): Player
}
interface PlayerConstructor extends EntityConstructor {
  deck: Deck,
}

interface Deck extends Entity {
  length: number
  cards: SomeCard[]
  shuffle: () => void
  // pop: () => SomeCard | undefined
  // push: (cards: Card[]) => number
  new(constructor: DeckConstructor): Deck
}
interface DeckConstructor extends EntityConstructor {
  readonly cardRarityConfig: DeckCardRarityConfig,
  readonly cardTypeConfig: DeckCardTypeConfig,
  readonly seed: number,
  cards: SomeCard[],
}
interface DeckCardRarityConfig {
  [CardRarity.Common]: number,
  [CardRarity.Talent]: number,
  [CardRarity.Hero]: number,
  [CardRarity.Legend]: number,
}

interface DeckCardTypeConfig {
  [CardType.Creature]: number,
  [CardType.Spell]: number,
}

interface Card extends Entity {
  cost: number
  cancel: () => void
  restoreInitialCost: () => void
  new(constructor: CardConstructor): Card
}
interface CardConstructor extends EntityConstructor {
  cost: number
}

interface CreatureCard extends Card {
  attackPoints: number
  healthPoints: number
  archetype: Archetype
  races: Race[]
  attack: (target: CreatureCard | Player) => void
  block: (target: CreatureCard) => void
  takeDamage: (damage: number) => void
  new(constructor: CreatureCardConstructor): CreatureCard
}

interface CreatureCardConstructor extends CardConstructor {
  attackPoints: number,
  healthPoints: number,
  archetype: Archetype,
  races: Race[],
}

// interface CardRarityCard extends Card {
//   rarity: CardRarity
//   new(constructor: CardRarityCardConstructor): CardRarityCard
// }
// interface CardRarityCardConstructor extends CardConstructor {
//   rarity: CardRarity,
// }

interface SpellCard extends Card {
  cancel: () => void
  play: SpellCardBody,
  new(constructor: SpellCardConstructor): SpellCard
}

interface SpellCardConstructor extends CardConstructor {
  body: (target: any | any[]) => void
  validTargets: any[]
}

interface Turn {
  player: Player
  opponent: Player
}

interface Battle {
  players: Player[]
  winner: Player | null
  start: () => void
  end: () => void
  startTurn: (player: Player) => void
  endTurn: (player: Player) => void
  startRound: () => void
  endRound: () => void
  new(constructor: BattleConstructor): Battle
}

interface BattleConstructor {
  players: Player[]
}

interface ForgeConstructor {
  level: number
  rarity: CardRarity
}

interface Forge<T> extends Entity {
  new(constructor: ForgeConstructor): Forge<T>
  forge: () => T
}

type id = string

type SomeCard = CreatureCard | SpellCard

type SpellCardTarget = Player | SomeCard

type SpellCardBody = (target: SpellCardTarget | SpellCardTarget[]) => void
