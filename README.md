# Image Search App

SPA-додаток для пошуку, перегляду та збереження улюблених зображень з Unsplash

## Функції

- Пошук фото по ключовому слову (Unsplash API)
- Адаптивна сітка карток (Grid)
- Детальний перегляд у модальному вікні
- Улюблені (localStorage, зберігаються між сесіями)
- Світла/темна тема
- Фільтри (дата, лайки, алфавіт)
- Пагінація ("Load More")

## Стек

- React + Vite
- TypeScript
- CSS Modules + простий CSS
- fetch API
- Context API (тема)
- LocalStorage (улюблені)

## Як запустити

1. Встановити залежності:
   ```
   npm install
   ```
2. Додати файл `.env` з Unsplash API ключем:
   ```
   VITE_UNSPLASH_ACCESS_KEY=your_key_here
   ```
3. Запустити:
   ```
   npm run dev
   ```
4. Відкрити [http://localhost:5173](http://localhost:5173)

## Приклад запиту до API

```js
GET https://api.unsplash.com/search/photos?query=cat&page=1&per_page=12&client_id=YOUR_KEY
```

## Додаткові опції

- Світла/темна тема перемикається кнопкою у правому верхньому куті
- Улюблені синхронізуються з localStorage (залишаються після закриття сторінки)
- Accessibility: aria-label, aria-live, aria-pressed

## Автор

[https://t.me/nemesicc](https://t.me/nemesicc)
