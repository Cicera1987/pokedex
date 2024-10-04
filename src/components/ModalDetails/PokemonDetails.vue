<template>
  <div v-if="show" class="modal-backdrop" @click="close">
    <div class="modal-outer" :style="{
      backgroundColor: types.length > 0 ? typeColors[types[0]]?.bg : 'gray',
    }" @click.stop>
      <div class="header">
        <button @click="close" class="close-btn">
          <ArrowLeft />
        </button>
        <h2>{{ name }}</h2>
        <p>{{ id }}</p>
      </div>

      <div class="image-container">
        <img :src="sprites.front_default" alt="Imagem de {{ name }}" />
      </div>

      <div class="modal">
        <div :class="['types-container', { multiple: types.length > 1 }]">
          <div v-for="(type, index) in types" :key="index" class="type-item"
            :style="{ backgroundColor: typeColors[type]?.bg }">
            {{ type }}
          </div>
        </div>

        <div class="modal-content">
          <div>
            <div class="base-status" :style="{ color: typeColors[types[0]]?.text || 'gray' }">
              Base Status
            </div>
            <div v-for="(stat, index) in stats" :key="index" class="stat-item">
              <div class="stat-name" :style="{ color: typeColors[types[0]]?.text || 'gray' }">
                {{ stat.stat.name }}:
                <span class="base-stat">
                  {{ stat.base_stat }}
                </span>
              </div>

              <div class="progress-bar">
                <div class="progress" :style="{
                  width: `${Math.min(stat.base_stat, 100)}%`,
                  background: typeColors[types[0]]?.bg || 'gray',
                  borderRadius: stat.base_stat >= 100 ? '8px' : '8px 0 0 8px',
                }"></div>
                <div v-if="stat.base_stat < 100" class="progress-opaco" :style="{
                  width: `${100 - Math.min(stat.base_stat, 100)}%`,
                  background: 'rgba(0, 0, 0, 0.2)',
                  borderRadius: '0 8px 8px 0',
                }"></div>
              </div>
            </div>
          </div>
          <div v-if="evolutionChain.length > 0" class="evolution-container">
            <ul class="evolution-list">
              <li v-for="(evolution, index) in evolutionChain" :key="index" :class="[
                'evolution-item',
                {
                  'middle-evolution': index === 2,
                  'first-evolution': index === 0,
                  'second-evolution': index === 1,
                },
              ]">
                <img :src="evolution.sprite" alt="Imagem de {{ evolution.name }}" class="evolution-image" />
                <p class="evolution-name">{{ evolution.name }}</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import {
  getPokemonById,
  getSpeciesById,
  getEvolutionChain,
} from '../../services/pokeAPI'
import ArrowLeft from '../../assets/icons/arrowLeft.vue'
import { typeColors } from '../../types/typeColors'
import {
  Evolution,
  EvolutionChain,
  Stat,
  Type,
} from '../../types/evolutionChain'

const { show, name, id, sprites } = defineProps<{
  show: boolean
  name: string
  id: string | number
  sprites: {
    front_default: string
  }
}>()

const emits = defineEmits(['close'])
const stats = ref<Stat[]>([])
const types = ref<string[]>([])
const evolutionChain = ref<Evolution[]>([])

const close = () => {
  emits('close')
}

const fetchEvolutionChain = async (
  chain: EvolutionChain,
): Promise<Evolution[]> => {
  const getEvolutions = async (chain: EvolutionChain): Promise<Evolution[]> => {
    const speciesId = chain.species.url.split('/')[6]
    const pokemonResponse = await getPokemonById(speciesId)
    const sprite = pokemonResponse.data.sprites.front_default
    const currentEvolution: Evolution = {
      name: chain.species.name,
      sprite,
    }
    if (chain.evolves_to.length > 0) {
      const nextEvolutions = await getEvolutions(chain.evolves_to[0])
      return [currentEvolution, ...nextEvolutions]
    } else {
      return [currentEvolution]
    }
  }
  return getEvolutions(chain)
}

const fetchDetails = async () => {
  try {
    const pokemonId = Number(id)
    const response = await getPokemonById(pokemonId)
    const pokemonData = response.data
    stats.value = pokemonData.stats
    types.value = pokemonData.types.map((type: Type) => type.type.name)

    const speciesData = await getSpeciesById(pokemonId)
    const evolutionData = await getEvolutionChain(
      speciesData.evolution_chain.url,
    )

    evolutionChain.value = await fetchEvolutionChain(evolutionData.chain)
  } catch (error) {
    console.error('Error fetching Pokémon details:', error)
  }
}

onMounted(() => {
  fetchDetails()
})
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-outer {
  padding: 15px;
  border-radius: 12px;
}

.modal {
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
}

.close-btn {
  background: none;
  border: none;
  padding: 0;
  margin-right: 10px;
  cursor: pointer;
}

.close-btn svg {
  width: 20px;
  height: 20px;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

h2 {
  color: white;
  text-shadow:
    -1px -1px 0 #000000,
    1px -1px 0 #000000,
    -1px 1px 0 #000000,
    1px 1px 0 #000000;
  font-size: 24px;
}

p {
  color: rgba(0, 0, 0, 0.7);
}

.stat-name {
  font-weight: bold;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 280px;
}

span {
  color: #8d8383;
}

.image-container {
  display: flex;
  justify-content: center;
  margin-bottom: -55px;
}

.image-container img {
  width: 100%;
  max-width: 150px;
  height: auto;
}

.stat-item {
  margin-bottom: 10px;
  display: flex;
  align-items: center;
}

.stat-item span {
  font-size: 16px;
  margin-right: 10px;
}

.base-stat {
  font-weight: bold;
  margin-left: 10px;
}

.progress-bar {
  width: 100%;
  height: 10px;
  border-radius: 5px;
  background: #dddddd;
  margin-left: 10px;
  position: relative;
}

.progress {
  height: 100%;
  border-radius: 5px;
}

.progress-opaco {
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  border-radius: 5px;
}

.types-container {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  margin-top: 30px;
  margin-bottom: 40px;
}

.types-container.multiple {
  justify-content: space-between;
}

.type-item {
  padding: 5px 10px;
  border-radius: 8px;
  color: white;
  text-shadow:
    -1px -1px 0 #000000,
    1px -1px 0 #000000,
    -1px 1px 0 #000000,
    1px 1px 0 #000000;
  font-size: 18px;
  text-align: center;
  width: 80px;
}

.base-status {
  font-size: 18px;
  margin-bottom: 30px;
  display: flex;
  justify-content: center;
}

.evolution-container {
  display: flex;
  justify-content: center;
}

.evolution-list {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

.evolution-item {
  list-style: none;
  text-align: center;
  transition: transform 0.3s ease-in-out;
}

.first-evolution {
  transform: scale(1);
  padding: 5px;
}

.second-evolution {
  transform: scale(1.1);
  padding: 15px;
}

.middle-evolution {
  transform: scale(1.3);
  z-index: 2;
  padding: 10px;
}

.evolution-image {
  width: 80px;
  height: 80px;
  object-fit: cover;
}

.evolution-name {
  font-size: 14px;
  font-weight: bold;
  margin-top: 8px;
}

.evolution-item:hover {
  transform: scale(1.5);
}
</style>
