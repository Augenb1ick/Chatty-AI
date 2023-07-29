import React from 'react';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import ReactDOM from 'react-dom/client';
import App from './components/App.tsx';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18nest.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n}>
      <App />
    </I18nextProvider>
  </React.StrictMode>
);
