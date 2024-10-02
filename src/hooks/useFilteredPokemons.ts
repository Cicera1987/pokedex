// useFilteredPokemons.ts
import { ref, computed } from 'vue';
import { Pokemon } from '../types/pokemon';

export function useFilteredPokemons(pokemons: Pokemon[]) {
    const searchQuery = ref('');

    const filteredPokemons = computed(() => {
        const query = searchQuery.value.toLowerCase().trim();
        console.log('query: ', query);
        if (!query) {
            return pokemons;
        }
        return pokemons.filter(pokemon =>
            pokemon.name.toLowerCase().includes(query) ||
            pokemon.id.toString().includes(query)
        );
    });
    return {
        searchQuery,
        filteredPokemons
    };
}
