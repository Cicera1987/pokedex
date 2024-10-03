import axios from 'axios';

const api = axios.create({
    baseURL: 'https://pokeapi.co/api/v2/',
});


const getPokemons = async (query: string) => {
    const response = await api.get(`pokemon/${query.toLowerCase()}`);
    return response;
}


const getPokemonsList = async () => {
    const response = await api.get('pokemon?limit=100');
    return response;
}

const getPokemonById = (id: string | number) => {
    const formattedId = Number(id);
    return api.get(`pokemon/${formattedId}`);
};

const getSpeciesById = async (id: number) => {
    try {
        const response = await api.get(`pokemon-species/${id}`);
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar dados da espécie:', error);
    }
};

const getEvolutionChain = async (url: string) => {
    try {
        const relativeUrl = url.replace('https://pokeapi.co/api/v2/', '');

        const response = await api.get(relativeUrl);
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar a cadeia de evolução:', error);
    }
};

const extractEvolutions = (chain: any) => {
    let evolutions: any[] = [];
    evolutions.push(chain.species.name);
    if (chain.evolves_to && chain.evolves_to.length > 0) {
        chain.evolves_to.forEach((nextEvolution: any) => {
            evolutions = evolutions.concat(extractEvolutions(nextEvolution));
        });
    }

    return evolutions;
};

export { 
    getPokemonsList, 
    getPokemonById, 
    getPokemons, 
    getSpeciesById, 
    getEvolutionChain, 
    extractEvolutions 
};


