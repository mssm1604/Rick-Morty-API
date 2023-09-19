import { useEffect, useRef, useState } from 'react'
import { getProducts } from '../services/getCharacters'
import { useFilters } from './useFilters'

export function useGetCharacters() {
  const [characters, setCharacters] = useState([])
  const [infoData, setInfoData] = useState()
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [search, setSearch] = useState(null)
  const [filters, setFilters] = useState({
    sort: 'default'
  })

  const previosSearch = useRef(search)

  const handleShowMoreCharacters = () => {
    setCurrentPage(prevValue => prevValue + 1)
  }

  const getParamsToQuery = () => {
    let params
    const ifContactResults = false

    previosSearch.current === search
      ? (params = `?page=${currentPage}`)
      : (params = `?name=${search}`)

    return { params, ifContactResults }
  }

  useEffect(() => {
    setLoading(true)
    const { params, ifContactResults } = getParamsToQuery()
    getProducts({ params })
      .then(({ info, results }) => {
        setInfoData(info)
        ifContactResults
          ? setCharacters(lastCharacters => lastCharacters.concat(results))
          : setCharacters(results)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [search, currentPage])

  const { filterProducts } = useFilters()
  const filteredCharacters = filterProducts({ characters, filters })

  return {
    filteredCharacters,
    loading,
    handleShowMoreCharacters,
    setSearch,
    infoData,
    setFilters
  }
}
