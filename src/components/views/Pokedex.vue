<template>
  <div>
    <PokemonList :pokemons="pokemons" :loading="loading" :error="error" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { getPokemonList } from '../services/pokeAPI'
import { useI18n } from 'vue-i18n'
import PokemonList from '../PokemonList/List.vue'
import { DetailedPokemon } from '../../types/endpoints'

const { t } = useI18n()
const pokemons = ref<any[]>([])
const loading = ref(true)
const error = ref<string | null>(null)

const fetchPokemons = async () => {
  try {
    const data = await getPokemonList()
    const detailedPokemons = await Promise.all(
      data.results.map(async (pokemon: DetailedPokemon) => {
        const details = await axios.get(pokemon.url)
        return {
          id: String(details.data.id).padStart(3, '0'),
          name: details.data.name,
          sprites: details.data.sprites,
        }
      }),
    )
    pokemons.value = detailedPokemons
  } catch (err) {
    error.value = t('error')
  }
}

onMounted(fetchPokemons)
</script>

<style scoped>
/* Adicione estilos para o componente principal se necessário */
</style>
