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
    let ifContactResults = false

    if (previosSearch.current === search) {
      ifContactResults = true

      search
        ? (params = `?page=${currentPage}&name=${search}`)
        : (params = `?page=${currentPage}`)
    } else {
      ifContactResults = false
      params = `?name=${search}`
    }

    return { params, ifContactResults }
  }

  const updateCharacters = ({ valueToSet, ifContactResults }) => {
    if (ifContactResults) {
      setCharacters(lastCharacters => lastCharacters.concat(valueToSet))
    } else {
      setCharacters(valueToSet)
    }
  }

  useEffect(() => {
    setLoading(true)
    const { params, ifContactResults } = getParamsToQuery()
    getProducts({ params })
      .then(({ info, results }) => {
        setInfoData(info)
        updateCharacters({ valueToSet: results, ifContactResults })
      })
      .finally(() => {
        setLoading(false)
        previosSearch.current = search
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
