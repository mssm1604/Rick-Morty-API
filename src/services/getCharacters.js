const ENDPOIN_API = 'https://rickandmortyapi.com/api/character'

export async function getProducts({ params }) {
  try {
    const response = await fetch(`${ENDPOIN_API}/${params}`)

    return response.json()
  } catch (error) {
    console.log(error)
  }
}
