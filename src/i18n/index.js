import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import {initReactI18next} from 'react-i18next';
import en from './locales/en.json'
import ru from './locales/ru.json'
import arm from './locales/arm.json'

const defaultNS = 'translation';
const lng = localStorage.getItem('i18nextLng') || 'arm'

const resources = {
    arm: {
        common: {
            ...arm
        }
    },
    eng: {
        common: {
            ...en
        }
    },
    ru: {
        common: {
            ...ru
        }
    },
};

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        lng,
        ns: [defaultNS, 'local'],
        defaultNS,
        fallbackNS: ['local', 'common'],
        keySeparator: false,
        interpolation: {
            escapeValue: false,
            formatSeparator: ","
        },
        react: {
            wait: true
        }
    });

export default i18n;
