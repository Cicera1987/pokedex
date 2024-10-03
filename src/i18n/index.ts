import { createI18n } from 'vue-i18n'
import { SupportedLocales, supportedLocales } from './constants'
import LocaleFiles from './localeFiles'

const loadLocaleMessages = async (locale: SupportedLocales) => {
  const messages: Record<string, any> = {}
  const localeFiles = LocaleFiles(supportedLocales[locale])

  await Promise.all(
    localeFiles.map(async (file) => {
      const response = await fetch(file)
      if (response.ok) {
        const json = await response.json()
        messages[supportedLocales[locale]] = json
      } else {
        console.error(`Failed to load ${file}: ${response.statusText}`)
      }
    }),
  )
  return messages
}

export const createI18nInstance = async () => {
  const messages: Record<string, any> = {}

  for (const localeKey in supportedLocales) {
    const locale = localeKey as SupportedLocales
    const loadedMessages = await loadLocaleMessages(locale)
    messages[supportedLocales[locale]] = loadedMessages
  }

  return createI18n({
    locale: supportedLocales.ptBR,
    fallbackLocale: supportedLocales.en,
    messages,
  })
}

export default createI18nInstance
