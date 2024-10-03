<template>
  <div>
    <PokemonList :pokemons="pokemons" :loading="loading" :error="error" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios, { AxiosResponse } from 'axios'
import { getPokemonList, getPokemons } from '../services/pokeAPI'
import PokemonList from '../PokemonList/List.vue'
import { DetailedPokemon, PokemonResponse } from '../../types/endpoints'

const pokemons = ref<any[]>([])
const loading = ref(true)
const error = ref<string | null>(null)

const fetchPokemons = async (query: string = '') => {
  loading.value = true
  try {
    let pokemonsData

    if (query) {
      const response: AxiosResponse<PokemonResponse> = await getPokemons(query)
      pokemonsData = response.data.results
    } else {
      const response: AxiosResponse<PokemonResponse> = await getPokemonList()
      pokemonsData = response.data.results || []
    }

    const detailedPokemons = await Promise.all(
      pokemonsData.map(async (pokemon: DetailedPokemon) => {
        const details = pokemon.sprites
          ? pokemon
          : await axios.get(pokemon.url || '').then((res) => res.data)

        return {
          id: String(details.id).padStart(3, '0'),
          name: details.name,
          sprites: details.sprites,
        }
      }),
    )
    pokemons.value = detailedPokemons
  } catch (err) {
    error.value = 'Erro ao buscar pokémons'
    console.error(err)
  } finally {
    loading.value = false
  }
}

onMounted(fetchPokemons)
</script>

<style scoped>
/* Adicione estilos para o componente principal se necessário */
</style>
