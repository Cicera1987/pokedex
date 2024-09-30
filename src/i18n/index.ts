// src/i18n/index.ts
import { createI18n } from 'vue-i18n';
import { supportedLocales } from './constants';
import LocaleFiles from './localeFiles';


const loadLocaleMessages = async (locale: string) => {
    const messages: Record<string, any> = {};
    const localeFiles = LocaleFiles(locale);

    await Promise.all(localeFiles.map(async (file) => {
        const response = await fetch(file);
        if (response.ok) {
            const json = await response.json();
            const fileName = file.split('/').pop()?.replace('.json', '');
            messages[fileName!] = json;
        } else {
            console.error(`Failed to load ${file}: ${response.statusText}`);
        }
    }));

    return messages;
};
export const createI18nInstance = async () => {
    const messages = {
        [supportedLocales.ptBR]: await loadLocaleMessages('pt-BR'),
    };


    return createI18n({
        locale: supportedLocales.ptBR,
        fallbackLocale: supportedLocales.en,
        messages,
    });
};

export default createI18nInstance;


