import axios from 'axios'

const api = axios.create({
    baseURL: 'https://pokeapi.co/api/v2/'
})

export const getPokemon = async (id: number) => {
    const response = await api.get(`pokemon/${id}`)
    return response.data
}

export const getPokemonList = async (limit: number = 8, offset: number = 0) => {
    const response = await api.get(`pokemon?limit=${limit}&offset=${offset}`);
    return response.data
}