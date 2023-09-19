import { CharacterList } from './components/CharacterList'
import { Header } from './components/Header'
import { Filters } from './components/Filters'
import { useGetCharacters } from './hooks/useGetCharacters'
import './app.css'

export function App() {
  const {
    filteredCharacters,
    loading,
    handleShowMoreCharacters,
    setSearch,
    infoData,
    setFilters
  } = useGetCharacters()

  return (
    <>
      <Header>
        <Filters setSearch={setSearch} setFilters={setFilters} />
      </Header>
      <main>
        <section className='listWrapper'>
          {filteredCharacters?.length > 0 && (
            <CharacterList characters={filteredCharacters} />
          )}

          {loading && <p>Loading...</p>}

          {!loading &&
            filteredCharacters?.length > 0 &&
            infoData?.next && (
              <section>
                <button onClick={handleShowMoreCharacters}>
                  Show more characters
                </button>
              </section>
            )}
        </section>
      </main>
    </>
  )
}
