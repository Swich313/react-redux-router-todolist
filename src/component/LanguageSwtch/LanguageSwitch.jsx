import i18next from "i18next";
import {useTranslation} from "react-i18next";
import {useEffect, useState} from "react";

import classes from './LanguageSwitch.module.scss';

const LanguageSwitch = () => {
    const defaultLanguageState = [{
        code: 'en',
        name: 'English',
        country: 'United_Kingdom'
    }]
    const languagesState = [
        {
            code: 'ua',
            name: 'Українська',
            country: 'Ukraine'
        },
        {
            code: 'ru',
            name: 'Русский',
            country: 'Russia'
        },
        {
            code: 'de',
            name: 'Deutsch',
            country: 'Germany'
        },
        {
            code: 'fr',
            name: 'Français',
            country: 'France'
        },
        {
            code: 'it',
            name: 'Italiano',
            country: 'Italy'
        }
    ];
    const [defaultLanguage, setDefaultLanguage] = useState(defaultLanguageState);
    const [languages, setLanguages] = useState(languagesState);


    const {t} = useTranslation();
    const currentLanguageCode =  document.cookie.split('=') || 'en';
    const currentLanguage = languages.find(item => item.code === currentLanguageCode);

    useEffect(
        () => { document.title = t('app_title')
        }, [t]);

    const languageSelectHandler = (langCode) => {
        i18next.changeLanguage(langCode);
        const defaultLang = defaultLanguage;
        const selectedLang = [languages.find(item => item.code === langCode)];
        const remainLangs = languages.filter(item => item.code !== langCode);
        setLanguages([...remainLangs, ...defaultLang]);
        setDefaultLanguage(selectedLang);
    };

    const renderLanguages = (arr, type) => {
        return arr.map(({code, name, country}, i) => {
            // let langClass = (name === "English") ? "current_lang" : "selecting_lang";
            // const activeLangClass = (code === currentLanguageCode) ? "active" : null;
            // langClass = (country !== 'Russia') ? langClass : `${langClass} invalidLanguage`
            return (<div
                key={i.toString()}
                className={type === "active" ? classes.current_lang : classes.selecting_lang}
                onClick={function() {languageSelectHandler(code)}}
            >
                <img src={`https://cdn2.iconfinder.com/data/icons/world-flag-icons/128/Flag_of_${country}.png`}
                     className={classes.lang_flag} alt={`flag of ${country}`}/>
                <p className={classes.lang_text}>{name}</p>
            </div>)
        })
    };

    return (
        <div className={classes.switch_lang}>
            {renderLanguages(defaultLanguage, 'active')}
            <div className={classes.lang_dropdown}>
                {renderLanguages(languages)}
            </div>
        </div>
    )
}

export default LanguageSwitch;