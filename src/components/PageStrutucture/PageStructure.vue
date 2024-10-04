<template>
  <div class="page-structure">
    <div class="structure">
      <PokedexIcon />
      <div>
        <PageTitle :title="currentTranslation.title" />
      </div>
      <PokedexMenu :items="menuItems">
        <template #icon>
          <MenuIcon />
        </template>
        <template #language-selector>
          <LanguageSelector :currentLocale="currentLocale" :supportedLocales="localesArray"
            :changeLocale="changeLocale" />
        </template>
      </PokedexMenu>
    </div>
    <div>
      <div class="input-container">
        <div class="input-wrapper">
          <SearchIcon class="search-icon" />
          <input class="input-search" :placeholder="currentTranslation.searchPlaceholder" v-model="searchQuery" />
        </div>
      </div>
    </div>
    <PokemonList :pokemons="pokemons" :filteredPokemons="filteredPokemons" :loading="loading" :error="error" />
  </div>
</template>

<script setup lang="ts">
import axios from 'axios'
import darkModeIcon from '../../assets/icons/dark.vue'
import FavoriteIcon from '../../assets/icons/favorite.vue'
import LanguageSelector from '../LanguageSelector/selector.vue'
import lightModeIcon from '../../assets/icons/light.vue'
import MenuIcon from '../../assets/icons/menuIcon.vue'
import PageTitle from '../PageTitle/PageTitle.vue'
import PokedexIcon from '../../assets/icons/PokedexIcon.vue'
import PokedexMenu from '../pokedexMenu/PokedexMenu.vue'
import PokemonList from '../PokemonList/PokemonList.vue'
import SearchIcon from '../../assets/icons/search.vue'
import { DetailedPokemon } from '../../types/endpoints'
import { getPokemonList, getPokemons } from '../../services/pokeAPI'
import { onMounted } from 'vue'
import { Pokemon } from '../../types/pokemon'
import { ref, watch } from 'vue'
import { supportedLocales } from '../../i18n/constants'
import { useFilteredPokemons } from '../../hooks/useFilteredPokemons'
import { useTranslations } from '../../hooks/useTranslations'

const loading = ref(true)
const error = ref<string | null>(null)

const { changeLocale, currentLocale, currentTranslation } = useTranslations()
const isDarkMode = ref(false)
const localesArray = Object.keys(supportedLocales) as Array<
  keyof typeof supportedLocales
>
const pokemons = ref<Pokemon[]>([])

const { searchQuery, filteredPokemons } = useFilteredPokemons(pokemons.value)
const toggleTheme = () => {
  isDarkMode.value = !isDarkMode.value
}

const menuItems = ref([
  {
    icon: FavoriteIcon,
    label: currentTranslation.value.favorites,
    onClick: () => { },
  },
  {
    icon: isDarkMode.value ? lightModeIcon : darkModeIcon,
    label: isDarkMode.value ? currentTranslation.value.lightMode : currentTranslation.value.darkMode,
    onClick: toggleTheme,
  },
])

watch(currentTranslation, () => {
  menuItems.value[0].label = currentTranslation.value.favorites;
  menuItems.value[1].label = isDarkMode.value
    ? currentTranslation.value.lightMode
    : currentTranslation.value.darkMode;
});

watch(isDarkMode, (newValue) => {
  menuItems.value[1].icon = newValue ? lightModeIcon : darkModeIcon;
});

const fetchPokemons = async (query: string = '') => {
  loading.value = true
  try {
    let pokemonsData

    if (query) {
      const response = await getPokemons(query)
      pokemonsData = [response.data]
    } else {
      const response = await getPokemonList()
      pokemonsData = response.data.results || []
    }
    const detailedPokemons = await Promise.all(
      pokemonsData.map(async (pokemon: DetailedPokemon) => {
        const details = pokemon.sprites
          ? pokemon
          : await axios.get(pokemon.url).then((res) => res.data)

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

watch(searchQuery, (newQuery) => {
  fetchPokemons(newQuery)
})

onMounted(() => fetchPokemons(''))
</script>

<style>
body {
  margin: 0;
}
</style>

<style scoped>
.page-structure {
  padding: 1rem;
  min-height: 100vh;
  background-color: #d53e28;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.structure {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
}

.input-search {
  display: flex;
  width: 100%;
  padding: 8px 10px 8px 40px;
  border-radius: 20px;
  background-color: #ffffff;
  outline: none;
  border: 1px solid #867c7c;
  box-sizing: border-box;
  line-height: 1.5;
}

.input-wrapper {
  position: relative;
  width: 100%;
}

.input-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
}

.search-icon {
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
}

@media (max-width: 768px) {
  .structure {
    flex-direction: column;
    align-items: flex-start;
  }

  .input-search {
    padding: 8px 10px 8px 40px;
  }
}

@media (max-width: 480px) {
  .page-structure {
    padding: 0.5rem;
  }

  .input-search {
    font-size: 16px;
  }
}
</style>
