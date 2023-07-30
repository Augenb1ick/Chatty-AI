## 📖 Описание:

Виртуальный помощник PAWsistant.
Призван помогать во всех вопросах, связанных с домашними животными.

- Создан на основе нейронной сети [OpenAI](https://openai.com/);
- Взаимодействие с ассистеном происходит в формате чата;
- Задать вопрос помощнику можно текстом или голосом;
- Для обогащения данных нейросети запрос пользователя предварительно передаётся поисковому движку, после чего полученные данные передаются в контекст нейросети в месте с первоначальным запросом;
- Реализованы веб и мобильная версии.

[Ссылка на Vercel](https://chatty-ai-gamma.vercel.app/)

Проектная работа в рамках хакатона от Яндекс.Практикум

## ⚙️ Технологии:

- WebSpeech API [(react-speech-recognition)](https://www.npmjs.com/package/react-speech-recognition)
- [Google Custom search JSON API](https://developers.google.com/custom-search/v1/overview)
- [OpenAI Chat Completions API](https://platform.openai.com/docs/guides/gpt/chat-completions-api)
- [Navigator Web API](https://developer.mozilla.org/en-US/docs/Web/API/Navigation_API)
- [i18next: Internationalization-framework](https://www.npmjs.com/package/i18next)

## 🛠️ Стэк:

![HTML](https://img.shields.io/badge/-HTML-05122A?style=flat&logo=HTML5)&nbsp;
![CSS](https://img.shields.io/badge/-CSS-05122A?style=flat&logo=CSS3&logoColor=1572B6)&nbsp;
![Typescript](https://img.shields.io/badge/-Typescript-007ACC?style=flat&logo=typescript&logoColor=white)&nbsp;
![JavaScript](https://img.shields.io/badge/-JavaScript-05122A?style=flat&logo=javascript)&nbsp;
![React](https://img.shields.io/badge/-React-05122A?style=flat&logo=react)&nbsp;
![Figma](https://img.shields.io/badge/-Figma-05122A?style=flat&logo=figma)&nbsp;
![Git](https://img.shields.io/badge/-Git-05122A?style=flat&logo=git)&nbsp;

## 🚀 Инструкция по сборке и запуску:

1. Клонируйте репозиторий

```
git clone https://github.com/Augenb1ick/Chatty-AI.git
```

2. Перейдите в локальную папку с проектом и установите зависимости

```
npm i
```

3. Создайте файл с переменными окружения .env и поместите туда:<br>
   VITE*OPENAI_API_KEY=*your-api-key*<br>
   [Можно создать после регистрации и авторизации здесь](https://platform.openai.com/account/api-keys)<br>
   VITE*GOOGGLE*SEARCH_API_KEY=\_your-api-key*<br>
   [Можно создать после регистрации и авторизации здесь](https://developers.google.com/custom-search/v1/overview?hl=ru)<br>
   VITE*GOOGGLE_SEARCH_ENGINE_ID=*your-engine-id\*<br>
   [После выполнения предыдущего пункта можно получить здесь](https://programmablesearchengine.google.com/controlpanel/all)

4. Запустите приложение

```
npm run dev
```

## ✨ Дизайн

- [Макет](https://www.figma.com/file/5yScbBaI5I4bB23kjTW0TM/%D0%A5%D0%B0%D0%BA%D0%B0%D1%82%D0%BE%D0%BD?node-id=159%3A46289&mode=dev)
- [Шрифт Roboto](https://fonts.google.com/specimen/Roboto)
- Веб-версия 1024-1440px
- Мобильная версия 375-425px

## 👯 Команда:

- Project Manager<br>
  Нина Татаринова
- Дизайн<br>
  Серафима Чердынцева<br>
  Ольга Луркина
- Фронтенд<br>
  Никита Савоськин<br>
  Александр Аншуков

## 🤖 Будущая доработка проекта будет включать в себя:

- Подключение бэкенда и баз данных;
- Создание личного кабинета в котором будет возможность добавить информацию о животном, историю болезней, дате последней вакцинации и т.д. (все эти данные будут передаваться в контекст нейросети), что позволит нейросети генерировать ответ более точно, с привязкой к конкретному животному;
- Реализация напоминий о датах следующих визитов к ветеринару и вакцинации (на основе данных личного кабинета);
- Сохранение истории взаимодействия с ассистеном.
