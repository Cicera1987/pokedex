export const supportedLocales = {
    ptBR: "Português(Brasil)",
    en: "English",
} as const;

export type SupportedLocales = keyof typeof supportedLocales;