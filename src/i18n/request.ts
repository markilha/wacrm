import { getRequestConfig } from 'next-intl/server';

const dictionaries = {
  en: () => import('../../messages/en.json'),
  es: () => import('../../messages/es.json'),
  ko: () => import('../../messages/ko.json'),
  pt: () => import('../../messages/pt.json')
} as const;

type DictionaryLocale = keyof typeof dictionaries;

function getDictionaryLocale(locale: string): DictionaryLocale {
  if (locale.toLowerCase() === 'pt-br') return 'pt';
  return locale in dictionaries ? (locale as DictionaryLocale) : 'en';
}

export default getRequestConfig(async () => {
  // Read the locale from the environment, defaulting to 'en'
  const locale = process.env.NEXT_PUBLIC_APP_LOCALE || 'en';
  const dictionaryLocale = getDictionaryLocale(locale);
  const messages = (await dictionaries[dictionaryLocale]()).default;

  return {
    locale,
    messages
  };
});
