"use strict";

const COURSES_PER_PAGE = 9;

const CATEGORIES = [
  "All",
  "Marketing",
  "Management",
  "HR & Recruiting",
  "Design",
  "Development",
];

const CATEGORY_MODIFIERS = {
  Marketing: "marketing",
  Management: "management",
  "HR & Recruiting": "hr",
  Design: "design",
  Development: "development",
};

const PHOTOS = [
  "assets/img/teacher_2.png",
  "assets/img/teacher_1.png",
  "assets/img/teacher_3.png",
  "assets/img/teacher_4.png",
  "assets/img/teacher_5.png",
  "assets/img/teacher_6.png",
  "assets/img/teacher_7.png",
  "assets/img/teacher_8.png",
  "assets/img/teacher_9.png",
];

function photo(index) {
  return PHOTOS[index % PHOTOS.length];
}

const courses = [
  {
    id: 1,
    title: "The Ultimate Google Ads Training Course",
    category: "Marketing",
    price: 100,
    instructor: "Jerome Bell",
    photo: photo(0),
  },
  {
    id: 2,
    title: "Product Management Fundamentals",
    category: "Management",
    price: 480,
    instructor: "Marvin McKinney",
    photo: photo(1),
  },
  {
    id: 3,
    title: "HR Management and Analytics",
    category: "HR & Recruiting",
    price: 200,
    instructor: "Leslie Alexander Li",
    photo: photo(2),
  },
  {
    id: 4,
    title: "Brand Management & PR Communications",
    category: "Marketing",
    price: 530,
    instructor: "Kristin Watson",
    photo: photo(3),
  },
  {
    id: 5,
    title: "Graphic Design Basic",
    category: "Design",
    price: 500,
    instructor: "Guy Hawkins",
    photo: photo(4),
  },
  {
    id: 6,
    title: "Business Development Management",
    category: "Management",
    price: 400,
    instructor: "Dianne Russell",
    photo: photo(5),
  },
  {
    id: 7,
    title: "Highload Software Architecture",
    category: "Development",
    price: 600,
    instructor: "Brooklyn Simmons",
    photo: photo(6),
  },
  {
    id: 8,
    title: "Human Resources – Selection and Recruitment",
    category: "HR & Recruiting",
    price: 150,
    instructor: "Kathryn Murphy",
    photo: photo(7),
  },
  {
    id: 9,
    title: "User Experience. Human-centered Design",
    category: "Design",
    price: 240,
    instructor: "Cody Fisher",
    photo: photo(8),
  },
  {
    id: 10,
    title: "Social Media Marketing Strategy",
    category: "Marketing",
    price: 350,
    instructor: "Wade Warren",
    photo: photo(0),
  },
  {
    id: 11,
    title: "Strategic Leadership Foundations",
    category: "Management",
    price: 420,
    instructor: "Cameron Williamson",
    photo: photo(1),
  },
  {
    id: 12,
    title: "Employee Engagement & Culture",
    category: "HR & Recruiting",
    price: 180,
    instructor: "Esther Howard",
    photo: photo(2),
  },
  {
    id: 13,
    title: "Advanced React Patterns & Performance",
    category: "Development",
    price: 550,
    instructor: "Jacob Jones",
    photo: photo(6),
  },
  {
    id: 14,
    title: "Content Marketing & Copywriting",
    category: "Marketing",
    price: 280,
    instructor: "Annette Black",
    photo: photo(3),
  },
  {
    id: 15,
    title: "Talent Acquisition & Onboarding",
    category: "HR & Recruiting",
    price: 220,
    instructor: "Jenny Wilson",
    photo: photo(7),
  },
  {
    id: 16,
    title: "Compensation & Benefits Management",
    category: "HR & Recruiting",
    price: 310,
    instructor: "Theresa Webb",
    photo: photo(5),
  },
  {
    id: 17,
    title: "Node.js & Microservices Architecture",
    category: "Development",
    price: 480,
    instructor: "Ronald Richards",
    photo: photo(8),
  },
];

// ─── State ────────────────────────────────────────────────────────────────────

var state = {
  category: "All",
  query: "",
  visible: COURSES_PER_PAGE,
};

// ─── DOM refs ─────────────────────────────────────────────────────────────────

var filterList = document.getElementById("filter-list");
var searchInput = document.getElementById("search-input");
var grid = document.getElementById("courses-grid");
var loadMoreBtn = document.getElementById("load-more-btn");
var loadMoreWrap = document.getElementById("load-more-wrapper");

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getFiltered() {
  var q = state.query.trim().toLowerCase();
  var cat = state.category;

  return courses.filter(function (c) {
    var matchCat = cat === "All" || c.category === cat;
    var matchSearch = !q || c.title.toLowerCase().includes(q);
    return matchCat && matchSearch;
  });
}

function categoryCount(cat) {
  if (cat === "All") return courses.length;
  return courses.filter(function (c) {
    return c.category === cat;
  }).length;
}

// ─── Templates ────────────────────────────────────────────────────────────────

function renderCard(course) {
  var mod = CATEGORY_MODIFIERS[course.category] || "marketing";
  return (
    '<article class="course-card" role="listitem">' +
    '<div class="course-card__image">' +
    "<img" +
    ' class="course-card__photo"' +
    ' src="' +
    course.photo +
    '"' +
    ' alt="' +
    course.instructor +
    '"' +
    ' loading="lazy"' +
    ">" +
    "</div>" +
    '<div class="course-card__body">' +
    '<span class="course-card__category course-card__category--' +
    mod +
    '">' +
    course.category +
    "</span>" +
    '<h3 class="course-card__title">' +
    course.title +
    "</h3>" +
    '<div class="course-card__footer">' +
    '<span class="course-card__price">$' +
    course.price +
    "</span>" +
    '<span class="course-card__divider" aria-hidden="true"></span>' +
    '<span class="course-card__author">by ' +
    course.instructor +
    "</span>" +
    "</div>" +
    "</div>" +
    "</article>"
  );
}

function renderFilterBtn(cat, isActive) {
  var count = categoryCount(cat);
  return (
    '<li class="filter__item">' +
    "<button" +
    ' class="filter__btn' +
    (isActive ? " filter__btn--active" : "") +
    '"' +
    ' data-category="' +
    cat +
    '"' +
    ' type="button"' +
    ' aria-pressed="' +
    isActive +
    '"' +
    ">" +
    cat +
    ' <span class="filter__count">' +
    count +
    "</span>" +
    "</button>" +
    "</li>"
  );
}

// ─── Render ───────────────────────────────────────────────────────────────────

function render() {
  var filtered = getFiltered();
  var visible = filtered.slice(0, state.visible);

  if (visible.length === 0) {
    grid.innerHTML = '<p class="catalog__empty">No courses found</p>';
  } else {
    grid.innerHTML = visible.map(renderCard).join("");
  }

  loadMoreWrap.hidden = filtered.length <= state.visible;
}

function renderFilters() {
  filterList.innerHTML = CATEGORIES.map(function (cat) {
    return renderFilterBtn(cat, cat === state.category);
  }).join("");
}

// ─── Event listeners ─────────────────────────────────────────────────────────

filterList.addEventListener("click", function (e) {
  var btn = e.target.closest(".filter__btn");
  if (!btn) return;

  state.category = btn.dataset.category;
  state.visible = COURSES_PER_PAGE;

  renderFilters();
  render();
});

searchInput.addEventListener("input", function (e) {
  state.query = e.target.value;
  state.visible = COURSES_PER_PAGE;
  render();
});

loadMoreBtn.addEventListener("click", function () {
  state.visible += COURSES_PER_PAGE;
  render();
});

// ─── Init ─────────────────────────────────────────────────────────────────────

renderFilters();
render();
