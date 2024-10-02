import axios from 'axios';

const api = axios.create({
    baseURL: 'https://pokeapi.co/api/v2/',
});
console.log('api: ', api);

const getPokemons = async  (query: string) => {
    const response = await api.get(`pokemon/${query.toLowerCase()}`);
    return response;
}


const getPokemonsList = async () => {
        const response = await api.get('pokemon?limit=100');
        return response; 
}

const getPokemonById = (id: string) => {
    const response = api.get(`pokemon/${id}`);
    return response;
}

export { getPokemonsList, getPokemonById, getPokemons };


