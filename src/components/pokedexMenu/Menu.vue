<template>
    <div class="menu-container">
        <div @click="toggleMenu" class="menu-icon">
            <slot name="icon" />
        </div>
        <div v-if="menuOpen" class="menu-options">
            <div v-for="(item, index) in items" :key="index" class="menu-item" @click="handleItemClick(item)">
                <div class="item-icon">
                    <component :is="item.icon" v-if="typeof item.icon !== 'string'" />
                </div>
                <div class="item-label">{{ item.label }}</div>
                <div class="item-status">{{ item.status }}</div>
            </div>
            <div class="menu-item">
                <slot name="language-selector" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, defineProps, DefineComponent } from 'vue';

export interface MenuItem {
    icon?: string | DefineComponent<{}, {}, any>;
    label: string;
    status?: string;
    onClick: () => void;
}

const props = defineProps<{
    items: MenuItem[];
}>();

const items = props.items;
const menuOpen = ref(false);

const toggleMenu = () => {
    menuOpen.value = !menuOpen.value;
};

const handleItemClick = (item: MenuItem) => {
    item.onClick();
    menuOpen.value = false;
};
</script>

<style scoped>
.menu-container {
    position: relative;
}

.menu-icon {
    cursor: pointer;
}

.menu-options {
    min-width: 150px;
    position: absolute;
    z-index: 1000;
    background: white;
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    right: 0;
    top: 100%;
}

.menu-item {
    display: flex;
    align-items: center;
    padding: 5px;
    gap: 10px;
    cursor: pointer;
}

.menu-item:hover {
    background-color: #F0F0F0;
    border-radius: 5px;
}
</style>
