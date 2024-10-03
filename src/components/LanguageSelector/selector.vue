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
  left: 5px;
  pointer-events: none;
}

.language-select {
  flex: 1;
  padding: 5px 40px 5px 30px;
  outline: none;
  border: none;
  background-color: white;
  cursor: pointer;
  appearance: none;
}

.language-select option {
  color: #867c7c;
}

.language-select option:disabled {
  color: #867c7c;
}
</style>
