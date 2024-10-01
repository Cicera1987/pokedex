<template>
    <div class="page-structure">
        <div class="structure">
            <PokedexIcon />
            <div>
                <PageTitle :title="'pokedex.title'" />
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
        <Pokedex />
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import PageTitle from '../PageTitle/PageTitle.vue';
import PokedexMenu from '../pokedexMenu/Menu.vue';
import Pokedex from '../views/Pokedex.vue';
import PokedexIcon from '../../assets/icons/PokedexIcon.vue';
import MenuIcon from '../../assets/icons/menuIcon.vue';
import FavoriteIcon from '../../assets/icons/favorite.vue';
import darkModeIcon from '../../assets/icons/dark.vue';
import lightModeIcon from  '../../assets/icons/ligth.vue';
import LanguageSelector from '../LanguageSelector/selector.vue';
import { useTranslations } from '../../hooks/useTranslations';
import { supportedLocales } from '../../i18n/constants';

const { changeLocale, currentLocale } = useTranslations();
const isDarkMode = ref(false);
const localesArray = Object.keys(supportedLocales) as Array<keyof typeof supportedLocales>

const toggleTheme = () => {
    isDarkMode.value = !isDarkMode.value;
};

const menuItems = ref([
    {
        icon: FavoriteIcon,
        label: 'Favoritos',
        onClick: () => { alert('Favoritos clicado!'); },
    },
    {
        icon: isDarkMode.value ? lightModeIcon : darkModeIcon,
        label: isDarkMode.value ? 'Modo Claro' : 'Modo Escuro',
        onClick: toggleTheme,
    },
]);

watch(isDarkMode, (newValue) => {
    menuItems.value[1].icon = newValue ? lightModeIcon : darkModeIcon;
    menuItems.value[1].label = newValue ? 'Modo Claro' : 'Modo Escuro';
});
</script>

<style scoped>
.page-structure {
    padding: 2rem;
    background-color: #D53E28;
}

.structure {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>
