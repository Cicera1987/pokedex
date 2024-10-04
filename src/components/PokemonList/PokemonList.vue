<template>
  <div class="pokemon-list">
    <ul>
      <li
        v-for="pokemon in paginatedPokemons"
        :key="pokemon.id"
        @click="openDetails(pokemon)"
        class="pokemon-item"
      >
        <img
          v-if="pokemon.sprites && pokemon.sprites.front_default"
          :src="pokemon.sprites.front_default"
          alt="Imagem de {{ pokemon.name }}"
        />
        <div class="pokemon-info">
          <p>
            {{ formatId(pokemon.id) }}<span>{{ pokemon.name }}</span>
          </p>
        </div>
      </li>
    </ul>
    <Pagination
      :pokemons="props.pokemons"
      :itemsPerPage="itemsPerPage"
      @update:paginatedPokemons="updatePaginatedPokemons"
      :filteredPokemons="filteredPokemons"
    />

    <div>
      <PokemonDetails
        v-if="isModalVisible"
        :show="isModalVisible"
        :name="selectedPokemon?.name ?? ''"
        :id="selectedPokemon?.id ?? 0"
        :sprites="selectedPokemon?.sprites ?? { front_default: '' }"
        @close="closeModal"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref, watch } from 'vue'
import Pagination from '../Pagination/Pagination.vue'
import { Pokemon } from '../../types/pokemon'
import { useFilteredPokemons } from '../../hooks/useFilteredPokemons'
import PokemonDetails from '../Modals/PokemonDetails.vue'

const pokemons = ref<Pokemon[]>([])

const { filteredPokemons } = useFilteredPokemons(pokemons.value)

const props = defineProps<{
  pokemons: Pokemon[]
  loading: boolean
  error: string | null
}>()

const itemsPerPage = 8
const paginatedPokemons = ref<Pokemon[]>([])

const selectedPokemon = ref<Pokemon | null>(null)
const isModalVisible = ref(false)

const openDetails = (pokemon: Pokemon) => {
  selectedPokemon.value = pokemon
  isModalVisible.value = true
}

const closeModal = () => {
  isModalVisible.value = false
}

const updatePaginatedPokemons = (newPokemons: Pokemon[]) => {
  paginatedPokemons.value = newPokemons
}

watch(
  () => filteredPokemons,
  (newFilteredPokemons) => {
    updatePaginatedPokemons(newFilteredPokemons.value.slice(0, itemsPerPage))
  },
)

const formatId = (id: number) => {
  return String(id).padStart(3, '0')
}
</script>

<style scoped>
.pokemon-list {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  background-color: white;
  border-radius: 20px;
  align-items: center;
}

ul {
  display: flex;
  flex-wrap: wrap;
  max-width: 400px;
  height: auto;
  justify-content: center;
  flex-grow: 1;
}

.pokemon-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 140px;
  cursor: pointer;
}

p {
  font-size: 14px;
  color: #867c7c;
}

span {
  font-size: 18px;
  font-weight: bold;
  color: #867c7c;
  padding: 5px;
}

img {
  border-radius: 10px;
  transition:
    transform 0.2s,
    box-shadow 0.2s;
}

img:hover {
  transform: scale(1.1);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.4);
}

.pokemon-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}
</style>
