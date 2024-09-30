<template>
    <div>
        <h2>Lista de Pokémons</h2>
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
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { getPokemonList } from '../services/pokeAPI'

const pokemons = ref<any[]>([])
const loading = ref(true) 
const error = ref<string | null>(null) 

// Função para buscar Pokémons
const fetchPokemons = async () => {
    try {
        const data = await getPokemonList(8) 
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
        error.value = 'Erro ao carregar Pokémons';
    } finally {
        loading.value = false;
    }
}

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
}</style>
