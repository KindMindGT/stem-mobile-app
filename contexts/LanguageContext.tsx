import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import es from '../translations/es';
import en from '../translations/en';

type Language = 'es' | 'en';
type TranslationSet = typeof es;

const STORAGE_KEY = '@stem_language';

const translations: Record<Language, TranslationSet> = { es, en };

type LanguageContextValue = {
  language: Language;
  setLanguage: (lang: Language) => Promise<void>;
  t: TranslationSet;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('es');

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((stored: string | null) => {
      if (stored === 'es' || stored === 'en') {
        setLanguageState(stored);
      }
    });
  }, []);

  const setLanguage = useCallback(async (lang: Language) => {
    setLanguageState(lang);
    await AsyncStorage.setItem(STORAGE_KEY, lang);
  }, []);

  const t = translations[language];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}
