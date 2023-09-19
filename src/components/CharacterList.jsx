import './characters.css'

export function CharacterList({ characters }) {
  return (
    <ul className='charactersList'>
      {characters?.map(character => (
        <li key={character.id}>
          <picture>
            <img
              width={200}
              height={200}
              src={character?.image}
              alt={`This is the image of the character ${character.name} who is a ${character.species} from ${character.location.name}`}
            />
          </picture>

          <section className='characterInfo'>
            <div className='gender'>
              <h3>{character.name}</h3>
              <span>{character.gender}</span>
            </div>
            <div className='location'>
              <span>Ubicación: </span>
              <span>{character.location.name}</span>
            </div>
          </section>
        </li>
      ))}
    </ul>
  )
}
