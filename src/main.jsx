import React from 'react'
import ReactDOM from 'react-dom/client'
import i18n from 'i18next';
import {initReactI18next} from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';
import {Provider} from 'react-redux';

import App from './App'
import store from "./store/index.js";

import './index.css'

i18n
    .use(initReactI18next)
    .use(LanguageDetector)
    .use(HttpApi)
    .init({
        supportedLngs: ['en', 'fr', 'ua', 'de', 'it', 'ru'],
        fallbackLng: 'en',
        detection: {
            order: ['path', 'cookie', 'htmlTag', 'localStorage', 'subdomain'],
            caches: ['cookies'],
        },
        backend: {
            loadPath: '/assets/locales/{{lng}}/translation.json',
        }
    });

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
)
