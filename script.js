let newBooksCardsWrapper = document.getElementById('new-books-cards');
let sellingBooksCards = document.getElementById('selling-book-cards');
let booksPage = document.getElementById('books-page');
let homePage = document.getElementById('home-page');
let homeBodyWrapper = document.getElementById('home-body-wrapper');
let booksPageBodyWrapper = document.getElementById('books-body-wrapper');
let pageBooksCards = document.getElementById('page-books-cards');
let genreBooksMenu = document.getElementById('genre-menu');
let mainBooksPageTitle = document.getElementById('main-title');
let allBooksMenu = document.getElementById('all-books-menu');
let menuGenreItemsWraper = document.getElementById('genre-menu-items');

let copyApiArr = (inArr) => {
  let arr = [];

  for(i = 0; i < inArr.length; i++) {
    arr.push(inArr[i]);
  }
  //forEach
  return arr;
}

//List genre Books
let getGenreBooks = (genreParam) => {
  let newGenreArr = new Set();
  let newArr = []
  
  for(let i = 0; i < genreParam.length; i++) {
    if(genreParam[i].genre !== '') {
      newArr = genreParam[i].genre.split(",");

      newArr.forEach(element => {
        newGenreArr.add(element)
      })

    }
  }
  console.log(newGenreArr)

  return [...newGenreArr];
}

let getRandomFourElem = (inArr) => {
  let arrCopy = copyApiArr(inArr);
  //ArrayFrom()
  let newItems = [];

  for(let i = 0; i < 4; i++) {
    let index = Math.floor(Math.random() * arrCopy.length);
    newItems.push(arrCopy[index]);
    arrCopy.slice(index, 1);
  }
  return newItems;
}

//Sort Array from rating:
let sortArrayOnRating = (sort) => {
  let sortArr = getRandomFourElem(sort);

  let compare = (a,b) => {
    if ( a.rating > b.rating ){
      return -1;
    }
    if ( a.rating < b.rating ){
      return 1;
    }
    return 0;
  }
  
  sortArr.slice(compare, 1);
  sortArr.sort(compare);
  console.log({sortArr})

  return sortArr;
};


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
  let dataApiOriginal = data.record.results;
  console.log(dataApiOriginal)

  let copyDataApi = getRandomFourElem(dataApiOriginal);
  let apiRating = sortArrayOnRating(dataApiOriginal);
  // let genreBooks = getGenreBooks(dataApiOriginal);
  let genreItem = getGenreBooks(dataApiOriginal);

  let templateCardsNewBooks = templateBooks(copyDataApi);
  let templateSellingBooks = templateBooks(apiRating);
  let templatePageAllCards = templateBooks(dataApiOriginal);
  // let templateGenreBooks = templateBooks(genreBooks);
  let templateGenreItems = templateGenreItemsInMenu(genreItem)

  newBooksCardsWrapper.innerHTML = templateCardsNewBooks;
  sellingBooksCards.innerHTML = templateSellingBooks;
  pageBooksCards.innerHTML = templatePageAllCards;
  menuGenreItemsWraper.innerHTML = templateGenreItems;
};
fetchData();

//Button to show just genre books
genreBooksMenu.addEventListener('click', () => {
  
});

//Button to show all books
allBooksMenu.addEventListener('click', () => {
  mainBooksPageTitle.innerHTML = 'All Books';
});

//Create template for lists all books cards:
let templateBooks = (data) => {
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

//Create template for genre items in menu:
let templateGenreItemsInMenu = (data) => {
  console.log(data)
  let templategenreItems = '';
  data.map(e => {
    templategenreItems +=
    `
    <a class="content">${e}</a>
   `
  })
  
  return templategenreItems;
}

booksPage.addEventListener('click', () => {
  homeBodyWrapper.style.display = 'none'
  booksPageBodyWrapper.style.display = 'block'
});

homePage.addEventListener('click', () => {
  homeBodyWrapper.style.display = 'grid'
  booksPageBodyWrapper.style.display = 'none'
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