# Online Courses Catalog

Pixel-perfect верстка каталога курсов по макету Figma.

## Дизайн

[Открыть макет в Figma](https://www.figma.com/design/iuXLXifXgv4ZCzad0KeYKr/Test-Task?node-id=0-1&p=f&t=pw3GHumF1wjTIGVU-0)

![Макет Figma](assets/preview.png)

## Стек

- HTML5 + семантическая разметка
- SCSS (BEM-методология) → компилируется в `style.css`
- Vanilla JavaScript (ES5-совместимый синтаксис, без библиотек)

## Функциональность

- **Фильтрация по категориям** — клик по вкладке показывает только нужные курсы, счётчики отображают количество в каждой категории
- **Живой поиск** по названию курса (без перезагрузки страницы)
- **Фильтр + поиск** работают совместно
- **Load more** — подгружает следующие 9 карточек, скрывается когда нечего показывать
- **Адаптивная резиновая вёрстка** — от 1920px до 320px через `clamp()` и CSS Grid `auto-fill`, без жёстких брейкпоинтов

## Запуск

```bash
# Просто открыть
open index.html

# Пересборка SCSS (если вносить изменения)
npm install
npm run build
```

## Структура SCSS (BEM)

```
scss/
├── _variables.scss   # дизайн-токены (цвета, типографика, отступы)
├── _reset.scss       # CSS reset
├── _catalog.scss     # блок .catalog (секция, сетка, декор)
├── _filter.scss      # блок .filter (вкладки-фильтры)
├── _search.scss      # блок .search (поисковый инпут)
├── _course-card.scss # блок .course-card (карточка курса)
├── _load-more.scss   # блок .load-more (кнопка)
└── main.scss         # точка входа, импортирует все блоки
```

## Что можно улучшить

- Добавить анимацию появления карточек при фильтрации (fade/slide)
- Lazy-loading изображений через IntersectionObserver для ускорения первой загрузки
- Debounce на поисковый инпут при большом датасете
