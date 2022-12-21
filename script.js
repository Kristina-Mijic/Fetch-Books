let newBooksCardsWrapper = document.getElementById('new-books-cards');
let sellingBooksCards = document.getElementById('selling-book-cards');
let booksPage = document.getElementById('books-page');
let homePage = document.getElementById('home-page');
let homeBodyWrapper = document.getElementById('home-body-wrapper');

let copyArr = (inArr) => {
  let arr = [];

  for(i = 0; i < inArr.length; i++) {
    arr.push(inArr[i]);
    // console.log({arr})
  }
  return arr;
}

let getRandomFourElem = (inArr) => {
  let arrCopy = copyArr(inArr);
  let newItems = [];

  for(let i = 0; i < 4; i++) {
    let index = Math.floor(Math.random() * arrCopy.length);
    newItems.push(arrCopy[index]);
    arrCopy.slice(index, 1);
  }
  return newItems;
}

let fetchData = async() => {
  const response = await fetch(
    'https://api.jsonbin.io/v3/b/63a0e753dfc68e59d56c71ec/latest',
    {
      method: 'GET',
      headers: {
        'X-Master-Key': '$2b$10$viPOiL/.5Te1ctsEnmquLuBHKGeK09Vp0SxT2m7wkH68/e1537nUK'
      }
    }
  );
  const data = await response.json();
  let dataApi = data.record.results;
  let copyDataApi = getRandomFourElem(dataApi)

  let templateCards = templateNewBooks(copyDataApi);

  newBooksCardsWrapper.innerHTML = templateCards;
  // sellingBooksCards.innerHTML = templateCards;
};
fetchData()


//Create template for lists all 'new books' cards:
let templateNewBooks = (data) => {
  let templateCards = '';
  data.map(e => {
    templateCards +=
    `
    <div class="card" id="new-books-card">
      <img src="${e.img}" alt="book-photo" class="book-photo">
      <h2 class="book-card-title">${e.title}</h2>
      <div class="book-card-rating">
        <p class="rating">rating: ${e.rating}</p>
        <i class="fa-solid fa-cart-shopping buy-icon"></i>
      </div>
    </div>
   `
  })
  return templateCards;
}; 

booksPage.addEventListener('click', () => {
  homeBodyWrapper.style.display = 'none'
});

homePage.addEventListener('click', () => {
  homeBodyWrapper.style.display = 'grid'
});

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