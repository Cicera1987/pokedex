<template>
    <div v-if="isOpen" class="modal">
        <div class="modal-container">
            <div class="container-button">
                <button @click="$emit('close')" class="close-btn">
                    <ArrowLeft />
                </button>
                <button @click="addPokemon" class="class-button">Favoritar</button>
            </div>
            <div class="dropdown">
                <button class="dropdown-button" @click="toggleDropdown">
                    Selecione
                    <ArrowSelect class="arrow-icon" /> <!-- Adicionando a seta aqui -->
                </button>
                <p v-if="selectedPokemons.length >= 8" class="error-text">
                    Selecione até 8 Pokémons
                </p>
                <ul v-if="isDropdownOpen" class="dropdown-list">
                    <li v-for="pokemon in pokemons" :key="pokemon.id" @click="togglePokemonSelection(pokemon.id)"
                        :class="{ selected: selectedPokemons.includes(pokemon.id) }">
                        {{ pokemon.name }}
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, defineProps } from "vue";
import ArrowLeft from "../../assets/icons/arrowLeft.vue";
import ArrowSelect from "../../assets/icons/arrowSelect.vue";

const props = defineProps<{
    isOpen: boolean;
    pokemons: { id: string; name: string }[];
    onAdd: (pokemonIds: string[]) => void;
}>();

const selectedPokemons = ref<string[]>([]);
const isDropdownOpen = ref(false);

const toggleDropdown = () => {
    isDropdownOpen.value = !isDropdownOpen.value;
};

const togglePokemonSelection = (pokemonId: string) => {
    if (selectedPokemons.value.includes(pokemonId)) {
        selectedPokemons.value = selectedPokemons.value.filter(id => id !== pokemonId);
    } else if (selectedPokemons.value.length < 8) {
        selectedPokemons.value.push(pokemonId);
    }
};

const addPokemon = () => {
    if (selectedPokemons.value.length > 0) {
        props.onAdd(selectedPokemons.value);
        selectedPokemons.value = [];
    }
};
</script>

<style scoped>
.modal {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1;
}

.modal-container {
    background-color: #d9d9d9;
    padding: 20px;
    border-radius: 10px;
    width: 269px;
    height: 335px;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.dropdown {
    position: relative;
    width: 100%;
}

.dropdown-button {
    width: 100%;
    padding: 10px;
    background-color: #ffffff;
    border: 1px solid #CCCCCC;
    border-radius: 5px;
    cursor: pointer;
    text-align: left;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.arrow-icon {
    margin-left: 8px;
}

.dropdown-list {
    list-style: none;
    margin: 0;
    padding: 5px;
    margin-top: 5px;
    background-color: white;
    border-radius: 10px;
    position: absolute;
    width: 260px;
    max-height: 235px;
    overflow-y: scroll;
    font-family: "Roboto";
    font-size: 16px;
    color: #333333;
    z-index: 1;

    scrollbar-width: none;
}

.dropdown-list::-webkit-scrollbar {
    display: none;
}

.dropdown-list li {
    padding: 8px;
    cursor: pointer;
    transition: background-color 0.2s;
    border-radius: 5px;
    margin-bottom: 5px;
}

.dropdown-list li:hover,
.dropdown-list li.selected {
    background-color: #C5E99B;
}

.container-button {
    width: 100%;
    display: flex;
    gap: 10px;
    justify-content: space-between;
}

.class-button {
    cursor: pointer;
    border: none;
    background-color: #d9d9d9;
    font-weight: bold;
    padding: 5px;
    color: #333333;
}

.class-button:hover {
    background-color: #CCCCCC;
    border-radius: 5px;
}

.close-btn svg {
    width: 20px;
    height: 20px;
}

.close-btn {
    background: none;
    border: none;
    padding: 0;
    margin-right: 10px;
    cursor: pointer;
}

.error-text {
    color: red;
    font-size: 10px;
    margin: 0;
    font-family: "Roboto";
    font-weight: bold;
    text-align: center;
}</style>
