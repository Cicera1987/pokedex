import axios from 'axios'


const api = axios.create({
    baseURL: 'https://pokeapi.co/api/v2/'
})

export const getPokemon = async (id: number)  => {
    const response = await api.get(`pokemon/${id}`)
    console.log('response: ', response);
    return response.data
}

export const getPokemonList = async () => {
    const response = await api.get('pokemon?limit=100'); 
    console.log('response: ', response);
    return response.data;
};


