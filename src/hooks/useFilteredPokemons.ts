import { ref, computed } from 'vue'
import { Pokemon } from '../types/pokemon'

export function useFilteredPokemons(pokemons: Pokemon[]) {
  const searchQuery = ref('')

  const filteredPokemons = computed(() => {
    const query = searchQuery.value.toLowerCase().trim()
    if (!query) {
      return pokemons
    }
    return pokemons.filter(
      (pokemon) =>
        pokemon.name.toLowerCase().startsWith(query) ||
        pokemon.id.toString().startsWith(query),
    )
  })

  return {
    searchQuery,
    filteredPokemons,
  }
}
