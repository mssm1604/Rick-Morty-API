export function useFilters() {
  const filterProducts = ({ characters, filters }) => {
    const { sort } = filters

    return sort !== 'default'
      ? characters.toSorted((a, b) =>
          sort !== 'location'
            ? a[sort].localeCompare(b[sort])
            : a[sort].name.localeCompare(b[sort].name)
        )
      : characters
  }

  return { filterProducts }
}
