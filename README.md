
# Автоматизированное тестирование для сайта Herb

Автоматизированные тесты для веб-сайта Herb.
Проект написан на JavaScript с использованием фреймворка Playwright, который обеспечивает кросс-браузерное тестирование (Chromium, Firefox, WebKit) и возможность запуска в headed и headless режимах.

Что покрываем:
Smoke-тесты критического пользовательского пути

Регрессионное тестирование ключевого функционала

Проверка UI-компонентов и навигации


## Технологический стэк

Node.js — среда выполнения

Playwright — основной фреймворк для тестирования

JavaScript (ES6) — язык программирования

Allure Playwright — генерация отчетов 

dotenv — работа с переменными окружения

Prettier — линтинг и форматирование кода



## Features

- **Авторизация/Регистрация** — вход по email, регистрация нового пользователя

## Установка

Предварительные требования:

Установленный Node.js (версия 16 или выше)

npm 

Шаги установки

1. Клонируй репозиторий:

```bash
  git clone https://github.com/Skrattar1/herb-automation.git
  cd tests
```
2. Установи зависимости:

```bash
  npm install 
```
3. Установи браузеры Playwright:

```bash
  npx playwright install@latest
```    
## Запуск тестов

Для запуска тестов 

```bash
  npm test
```

  или
```bash  
  npx playwright test
```
Тесты в headed-режиме для отладки:

```bash  
  npx playwright test --headed
```
Запуск конкретного теста:

```bash
  npx playwright test tests/auth.spec.js
```
Запуск в конкретном браузере:

```bash
  npx playwright test --project=chromium
```
Запуск с отладкой:

```bash
  npx playwright test --debug
```
## Переменные окружение

Переменные окружения для запуска тестов находятся в файле .env, который находится в репозиторие. Личные данные закодированы в Base64 и при запуске тестов функция decodeBase64 в envHelper.js переводит эти данные в формат utf-8 


## Автор

- Автор: Порошков Александр
- Telegram: [@skrattar2](https://t.me/skrattar2)
- Репозиторий [@Skrattar1](https://github.com/Skrattar1)
## Документация

- [Официальная документация Playwright](https://playwright.dev/docs/intro)


## Лицензия

[MIT](https://choosealicense.com/licenses/mit/)
