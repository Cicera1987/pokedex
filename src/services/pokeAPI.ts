import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL
})

const getPokemons = async (query: string) => {
  const response = await api.get(`pokemon/${query.toLowerCase()}`)
  return response
}

const getPokemonList = async () => {
  const response = await api.get('pokemon?limit=100')
  return response
}

const getPokemonById = (id: string | number) => {
  const formattedId = Number(id)
  return api.get(`pokemon/${formattedId}`)
}

const getSpeciesById = async (id: number) => {
  try {
    const response = await api.get(`pokemon-species/${id}`)
    return response.data
  } catch (error) {
    console.error('Error when fetching species data', error)
  }
}

const getEvolutionChain = async (url: string) => {
  try {
    const relativeUrl = url.replace('https://pokeapi.co/api/v2/', '')

    const response = await api.get(relativeUrl)
    return response.data
  } catch (error) {
    console.error('Error when searching for evolution chain', error)
  }
}

const extractEvolutions = (chain: any) => {
  let evolutions: any[] = []
  evolutions.push(chain.species.name)
  if (chain.evolves_to && chain.evolves_to.length > 0) {
    chain.evolves_to.forEach((nextEvolution: any) => {
      evolutions = evolutions.concat(extractEvolutions(nextEvolution))
    })
  }

  return evolutions
}

export {
  getPokemonList,
  getPokemonById,
  getPokemons,
  getSpeciesById,
  getEvolutionChain,
  extractEvolutions,
}
