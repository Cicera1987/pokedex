<template>
  <div class="language-selector">
    <div class="select-container">
      <div class="item-icon">
        <TranslateIcon />
      </div>
      <select
        v-model="currentLocale"
        @change="changeLocale"
        class="language-select"
      >
        <option
          v-for="(locale, key) in supportedLocales"
          :key="key"
          :value="locale"
        >
          {{ locale }}
        </option>
      </select>
    </div>
  </div>
</template>

<script setup lang="ts">
import { supportedLocales } from '../../i18n/constants'
import { ref } from 'vue'
import TranslateIcon from '../../assets/icons/translate.vue'
import { useI18n } from 'vue-i18n'
import { LocaleMessages } from '../../types/locales'
const { locale, messages } = useI18n<{
  'pt-BR': LocaleMessages
  en: LocaleMessages
}>()
const currentLocale = ref<string>(locale.value)
const changeLocale = () => {
  locale.value = currentLocale.value as keyof typeof messages.value
}
</script>

<style scoped>
.language-selector {
  width: 100%;
}

.select-container {
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
}

.item-icon {
  position: absolute;
  left: 8px;
  pointer-events: none;
}

.language-select {
  flex: 1;
  padding: 0.5rem 2.5rem 0.5rem 2rem;
  outline: none;
  border: 1px solid #CCCCCC;
  background-color: white;
  cursor: pointer;
  appearance: none;
  border-radius: 8px;
  font-size: 1rem;
  color: #333333;
  font-family: 'Roboto', sans-serif;
}


.language-select option {
  color: #333333;
}

.language-select option:disabled {
  color: #BBBBBB;
}

@media (max-width: 768px) {
  .select-container {
    flex-direction: column;
    align-items: flex-start;
  }

  .language-select {
    padding: 0.5rem;
  }
}</style>