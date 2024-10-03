import { computed, ref, toRaw } from 'vue'
import { useI18n } from 'vue-i18n'

interface PokedexMessages {
  pokemonList: string
  title: string
}

interface LocaleMessages {
  pokedex: PokedexMessages
}
export function useTranslations() {
  const { t, locale, messages } = useI18n<{
    'pt-BR': LocaleMessages
    en: LocaleMessages
  }>()
  const currentLocale = ref<string>(locale.value)

  const currentTranslation = computed(() => {
    const rawMessages = toRaw(messages.value)
    const langMessages = rawMessages[locale.value] as any

    if (langMessages) {
      return {
        pokemonList: langMessages[locale.value]?.pokedex.pokemonList,
        title: langMessages[locale.value]?.pokedex.title,
        searchPlaceholder:
          langMessages[locale.value]?.pokedex.searchPlaceholder,
      }
    }
    return {
      pokemonList: 'Translation not found',
      title: 'Title not found',
      searchPlaceholder: 'Search placeholder not found',
    }
  })

  const changeLocale = (newLocale: string) => {
    locale.value = newLocale as keyof typeof messages.value
    currentLocale.value = newLocale
  }

  return {
    t,
    currentTranslation,
    changeLocale,
    currentLocale,
  }
}
