<template>
    <div>
        <h2>{{ currentTranslation.pokemonList }}</h2>
             <h2>{{ currentTranslation.title }}</h2>

        <!-- Seletor de Idioma -->
        <select v-model="currentLocale" @change="changeLocale">
            <option v-for="(locale, key) in supportedLocales" :key="key" :value="locale">
                {{ locale }}
            </option>
        </select>

        <ul>
            <li v-for="pokemon in pokemons" :key="pokemon.id">
                <img :src="pokemon.sprites.front_default" alt="Imagem de {{ pokemon.name }}" />
                <span>#{{ pokemon.id }} - {{ pokemon.name }}</span>
            </li>
        </ul>
        <div v-if="loading">Carregando...</div>
        <div v-if="error">{{ error }}</div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
import { getPokemonList } from '../services/pokeAPI';
import { useI18n } from 'vue-i18n';
import { supportedLocales } from '../../i18n/constants';
import { toRaw } from 'vue';

interface PokedexMessages {
    pokemonList: string;
    title: string;
    
}

interface LocaleMessages {
    pokedex: PokedexMessages;
}

const {t, locale, messages } = useI18n<{ 'pt-BR': LocaleMessages; en: LocaleMessages }>();
const currentLocale = ref<string>(locale.value);

const currentTranslation = computed(() => {
    const rawMessages = toRaw(messages.value);
    const langMessages = rawMessages[locale.value] as any 
    
    if (langMessages) {
        return {
           pokemonList: langMessages[locale.value]?.pokedex.pokemonList,
           title: langMessages[locale.value]?.pokedex.title,
           seachPlaceholder: langMessages[locale.value]?.pokedex.seachPlaceholder
        };
    }
    return {
        pokemonList: 'Translation not found',
        title: 'Title not found',
        searchPlaceholder: 'Search placeholder not found'
    };
});

const pokemons = ref<any[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);
const fetchPokemons = async () => {
    try {
        const data = await getPokemonList(8);
        const detailedPokemons = await Promise.all(data.results.map(async (pokemon: any) => {
            const details = await axios.get(pokemon.url);
            return {
                id: details.data.id,
                name: details.data.name,
                sprites: details.data.sprites
            };
        }));

        pokemons.value = detailedPokemons;
    } catch (err) {
        error.value = t('error');
    } finally {
        loading.value = false;
    }
};

// Função para mudar o idioma
const changeLocale = () => {
    locale.value = currentLocale.value as keyof typeof messages.value;
};

onMounted(fetchPokemons);
</script>

<style scoped>
ul {
    list-style-type: none;
    padding: 0;
}

li {
    padding: 5px;
    display: flex;
    align-items: center;
}

img {
    width: 100px;
    height: 100px;
    margin-right: 10px;
}
</style>
