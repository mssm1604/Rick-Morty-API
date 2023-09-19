import './Filters.css'

import { useState } from 'react'

export function Filters({ setSearch, setFilters }) {
  const [searchValue, setSearchValue] = useState('')
  const handleSearchChange = e => {
    setSearchValue(e.target.value)
  }

  const handleSortBy = e => {
    setFilters(lastFilters => ({ ...lastFilters, sort: e.target.value }))
  }
  const handleSearchClick = () => {
    setSearch(searchValue)
  }

  return (
    <section className='flex filters'>
      <div className='flex inputWrapper searchWrapper'>
        <div className='flex'>
          <label htmlFor='searchCharacter'>Find characters</label>
          <input
            id='searchCharacter'
            type='text'
            placeholder='Rick, Alien, Morty...'
            value={searchValue}
            onChange={handleSearchChange}
          />
        </div>
      </div>

      <div className='flex inputWrapper sortBy'>
        <label htmlFor='sortBy'>Sort by</label>
        <select onChange={handleSortBy} name='sortBy' id='sortBy'>
          <option value='default'>Default</option>
          <option value='name'>Name</option>
          <option value='location'>Location</option>
        </select>
      </div>

      <button onClick={handleSearchClick}>Search</button>
    </section>
  )
}
