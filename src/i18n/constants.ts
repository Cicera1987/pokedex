export const supportedLocales = {
    ptBR: "pt-BR",
    en: "en",
} as const;

export type SupportedLocales = keyof typeof supportedLocales;