<template>
    <div class="pokemon-list">
        <ul>
            <li v-for="pokemon in paginatedPokemons" :key="pokemon.id" class="pokemon-item">
                <img :src="pokemon.sprites.front_default" alt="Imagem de {{ pokemon.name }}" />
                <div class="pokemon-info">
                    <p>#{{ formatId(pokemon.id) }}<span>{{ pokemon.name }}</span></p>
                </div>
            </li>
        </ul>
        <div class="pagination">
            <button @click="prevPage" :disabled="currentPage === 1">
                <ArrowLeft />
            </button>
            <div class="pagination-number">{{ currentPage }} de {{ totalPages }}</div>
            <button @click="nextPage" :disabled="currentPage === totalPages">
                <ArrowRight />
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { defineProps, ref, computed } from 'vue';
import  ArrowLeft from '../../assets/icons/arrowLeft.vue';
import  ArrowRight from '../../assets/icons/arrowRigth.vue'

const props = defineProps<{
    pokemons: Array<{
        id: number;
        name: string;
        sprites: {
            front_default: string;
        };
    }>;
    loading: boolean;
    error: string | null;
}>();

const currentPage = ref(1);
const itemsPerPage = 8;

const totalPages = computed(() => {
    return Math.ceil(props.pokemons.length / itemsPerPage);
});

const paginatedPokemons = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage;
    return props.pokemons.slice(start, start + itemsPerPage);
});

const nextPage = () => {
    if (currentPage.value < totalPages.value) {
        currentPage.value++;
    }
};

const prevPage = () => {
    if (currentPage.value > 1) {
        currentPage.value--;
    }
};

const formatId = (id: number) => {
    return String(id).padStart(3, '0');
};

</script>

<style scoped>
.pokemon-list {
    display: flex;
    flex-direction: column;
    background-color: white;
    padding: 10px;
    border-radius: 20px;
    align-items: center;
}

ul {
    list-style-type: none;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    max-width: 400px;
    justify-content: center;
}

.pokemon-item {
    padding: 3px;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 150px;
    margin: 5px;
    cursor: pointer;
}
p{
    font-size: 14px;
    color: #867C7C;
    padding: 5px;
}
span{
    font-size: 18px;
    font-weight: bold;
    color: #867C7C;
    padding: 5px;
}

img {
    width: 100px;
    height: 100px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    transition: transform 0.2s, box-shadow 0.2s;
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

.pagination {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin: 10px 0;
}

.pagination button {
    padding: 5px 10px;
    border: none;
    border-radius: 5px;
    background-color: white;
    cursor: pointer;
    margin: 0 10px;
}

.pagination button:disabled {
    cursor: not-allowed;
}

.pagination-number {
    margin-top: 10px;
    text-align: center;
    font-size: 18px;
    font-weight: bold;
    color: #867C7C;
}</style>
