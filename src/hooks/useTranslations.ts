import { computed, ref, toRaw } from 'vue'
import { useI18n } from 'vue-i18n'
import { LocaleMessages } from '../types/locales'

export function useTranslations() {
  const { t, locale, messages } = useI18n<{
    'pt-BR': LocaleMessages
    en: LocaleMessages
  }>()

  const currentLocale = ref<string>(locale.value)


  const currentTranslation = computed(() => {
    const rawMessages = toRaw(messages.value)
    const langMessages = rawMessages[locale.value] as any
    
    const translateStatName = (statName: string): string => {
      const translations: Record<string, string> = {
        hp: langMessages[locale.value]?.pokedex.stats.hp,
        attack: langMessages[locale.value]?.pokedex.stats.attack,
        defense: langMessages[locale.value]?.pokedex.stats.defense,
        special_attack: langMessages[locale.value]?.pokedex.stats.special_attack,
        special_defense: langMessages[locale.value]?.pokedex.stats.special_defense,
        speed: langMessages[locale.value]?.pokedex.stats.speed,
      };
      const translatedKey = statName.replace('-', '_');

      return translations[translatedKey] || statName;
    };
    
    if (langMessages) {
      return {
        pokemonList: langMessages[locale.value]?.pokedex.pokemonList,
        title: langMessages[locale.value]?.pokedex.title,
        searchPlaceholder: langMessages[locale.value]?.pokedex.searchPlaceholder,
        favorites: langMessages[locale.value]?.pokedex.favorites,
        darkMode: langMessages[locale.value]?.pokedex.darkMode,
        lightMode: langMessages[locale.value]?.pokedex.lightMode,
        basestatus: langMessages[locale.value]?.pokedex.basestatus,
        translateStatName: translateStatName,
      }
    }
    return {
      pokemonList: 'Translation not found',
      title: 'Title not found',
      searchPlaceholder: 'Search placeholder not found',
      favorites: 'Favorites not found',
      darkMode: 'Dark mode not found',
      lightMode: 'Light mode not found',
      basestatus: 'Base status not found',
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
