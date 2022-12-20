let inputField = document.getElementById('header-input').value;
let inputSearchBtn = document.getElementById('search-btn');
let homePage = document.getElementById('home-page');
let booksPage = document.getElementById('books-page');
let homeBodyWrapper = document.getElementById('home-body-wrapper');
let newBooksCards = document.getElementById('new-books-cards');
let bookCard = document.getElementById('new-books-card');
let bookPhoto = document.getElementById('book-photo');
let cardTitle = document.getElementById('card-title');
let cardRating = document.getElementById('card-rating');

let sellingBooksCards = document.getElementById('selling-book-cards');
let sellingBookCard = document.getElementById('selling-book')
let sellingCardTitle = document.getElementById('selling-card-title');
let sellingRating = document.getElementById('selling-rating');



//Created slider from home page:
let swiper = new Swiper(".mySwiper", {
  spaceBetween: 30,
  centeredSlides: true,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});