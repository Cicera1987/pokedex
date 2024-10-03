<template>
  <div class="page-title">
    <h1 class="title">{{ currentTranslation?.title || 'Default Title' }}</h1>
  </div>
</template>

<script setup lang="ts">
import { useTranslations } from '../../hooks/useTranslations'
const { currentTranslation } = useTranslations()
</script>

<style scoped>
.page-title {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.title {
  flex: 1;
  font-size: 1.5rem;
  font-weight: bold;
  font-family: 'Roboto', sans-serif;
  color: #f2f2f2;
}
</style>
