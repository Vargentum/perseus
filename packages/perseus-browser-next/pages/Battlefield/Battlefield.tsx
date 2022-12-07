import { Battle, Player, CreatureCard, SpellCard, SoulCard } from 'perseus-core'
import cn from 'classnames'
import styles from './Battlefield.module.css'
import { createContext, useContext } from 'react'

// const PlayerContext = createContext()

type SomeCard = CreatureCard | SpellCard | SoulCard

let me = new Player({
  name: 'Me'
})

let opponent = new Player({
  name: 'Opponent'
})

function CardView<T extends SomeCard>({card,  onPlay}: {
  card: T, 
  onPlay: (card: T) => void
}) {
  return (
    <div 
      className={cn(styles.card, {
        [styles.creature]: card instanceof CreatureCard,
        [styles.spell]: card instanceof SpellCard,
        [styles.soul]: card instanceof SoulCard,
        [styles.playable]: card.playable,
      })}
      onClick={() => card.playable && onPlay(card)}
    >
      {card.name}
      {card.description}
      {card.cost}
      {(() => {
        if (card instanceof CreatureCard) {
          return (
            <>
              {card.attackPoints}
              {card.healthPoints}
            </>
          )
        }
      })()}
    </div>
  )
}

function Hand({cards, onCardPlay}: {
  cards: SomeCard[],
  onCardPlay: (card: SomeCard) => void
}) {
  return (
    <div>
      {cards.map(card =>
        <CardView key={card.id} card={card} onPlay={onCardPlay} />
      )}
    </div>
  )
}

function PlayerZone() {
  let player = useContext()

  return (
    <>
      <Deck />
      <Hand />
    </>
  )
}


export function Battlefield() {
  return (
    <>
      <PlayerZone />
    </>
  )
}
