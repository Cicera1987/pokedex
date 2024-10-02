<template>
    <div class="pagination">
        <button @click="prevPage" :disabled="currentPage === 1">
            <ArrowLeft />
        </button>
        <div class="pagination-number">{{ currentPage }} de {{ totalPages }}</div>
        <button @click="nextPage" :disabled="currentPage === totalPages">
            <ArrowRight />
        </button>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, defineProps, defineEmits, watch } from 'vue';
import ArrowLeft from '../../assets/icons/arrowLeft.vue';
import ArrowRight from '../../assets/icons/arrowRigth.vue';
import { Pokemon } from '../../types/pokemon';

const props = defineProps<{
    pokemons: Pokemon[];  // Aqui você passará os pokémons filtrados
    itemsPerPage: number;
}>();

const emits = defineEmits<{
    (e: 'update:paginatedPokemons', pokemons: Pokemon[]): void;
}>();

const currentPage = ref(1);

const totalPages = computed(() => {
    return Math.ceil(props.pokemons.length / props.itemsPerPage);
});

const paginatedPokemons = computed(() => {
    const start = (currentPage.value - 1) * props.itemsPerPage;
    return props.pokemons.slice(start, start + props.itemsPerPage);
});

watch(paginatedPokemons, (newVal) => {
    emits('update:paginatedPokemons', newVal);  // Atualiza os pokémons paginados
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
</script>


<style scoped>
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
}
</style>
