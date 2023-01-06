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
let singleBookWrapper = document.getElementById('single-book-wrapper');

let data = [];
let dataApiOriginal = [];
let previousPage = '';


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
  let newArr = [];
  
  for(let i = 0; i < genreParam.length; i++) {
    if(genreParam[i].genre !== '') {
      newArr = genreParam[i].genre.split(",");

      newArr.forEach(element => {
        newGenreArr.add(element);
      })
    }
  }
  return [...newGenreArr];
}


let getRandomFourElem = (inArr) => {
  let arrCopy = copyApiArr(inArr);
  //ArrayFrom()
  let newItems = [];

  for(let i = 0; i < 4; i++) {
    let index = Math.floor(Math.random() * arrCopy.length);
    newItems.push(arrCopy[index]);
    arrCopy.splice(index, 1);
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
    return 0;
  }
  
  sortArr.slice(compare, 1);
  sortArr.sort(compare);
  // console.log({sortArr})

  return sortArr;
};



let fetchData = async(filterByGenre) => {
  const response = await fetch(
    'https://api.jsonbin.io/v3/b/63a0e753dfc68e59d56c71ec/latest',
    {
      method: 'GET',
      headers: {
        'X-Master-Key': '$2b$10$viPOiL/.5Te1ctsEnmquLuBHKGeK09Vp0SxT2m7wkH68/e1537nUK'
      }
    }
  );

  data = await response.json();
  dataApiOriginal = data.record.results;

  let copyDataApi = getRandomFourElem(dataApiOriginal);
  let apiRating = sortArrayOnRating(dataApiOriginal);
  let genreItem = getGenreBooks(dataApiOriginal);

  let templateCardsNewBooks = templateBooks(copyDataApi);
  let templateSellingBooks = templateBooks(apiRating);

  if(filterByGenre !== '') {
    dataApiOriginal = dataApiOriginal.filter(data => data.genre.
    indexOf(filterByGenre) > 0)
  }
  
  let templatePageAllCards = templateBooks(dataApiOriginal);
  let templateGenreItems = templateGenreItemsInMenu(genreItem);

  newBooksCardsWrapper.innerHTML = templateCardsNewBooks;
  sellingBooksCards.innerHTML = templateSellingBooks;
  pageBooksCards.innerHTML = templatePageAllCards;
  menuGenreItemsWraper.innerHTML = templateGenreItems;
  openSingleBookPage()
  filterGenre()
  
};
fetchData('');



//Create template for lists all books cards:
let templateBooks = (data) => {
  let templateCards = '';
  data.map(e => {
    templateCards +=
    `
    <div class="card" id="title">
      <img src="${e.img}" id="${e.title}" alt="book-photo" class="book-photo">
      <h2 class="book-card-title">${e.title}</h2>
      <div class="book-card-rating">
        <p class="rating">rating: ${e.rating}</p>
        <i class="fa-solid fa-cart-shopping buy-icon"></i>
      </div>
    </div>
   `
  });
 
  return templateCards;
}; 


//Create template for genre items in menu:
let templateGenreItemsInMenu = (data) => {
  let templategenreItems = '';

  data.sort().map(e => {
    templategenreItems +=
    `
    <a class="content">${e}</a>
   `
  })
  return templategenreItems;
}


//Filter genre on books page:
let filterGenre = () => {
  let genreContent = document.querySelectorAll('.content');

  genreContent.forEach(item => {
    item.addEventListener('click', (e) => {
      pageBooksCards.innerHTML = ''
      let itemGenre = e.target.firstChild.nodeValue;
      
      fetchData(itemGenre);
    })
  }) 
};


//Create template for single book page:
let templateSingleBookPage = (dataParamId) => {
  let bookData = dataApiOriginal.filter(data => data.title.trim() == dataParamId)[0]

  let templateSingleBook = '';
  templateSingleBook =
  `
    <div class="book-info-wrapper">
      <div class="book-wrapper">
        <div class="book-photo">
          <img src="${bookData.img}" alt="single-book-page">
        </div>
        <div class="book-info">
          <h1 class="book-info-title title-line">${bookData.title}</h1>
          <p class="info">AUTHOR: <span>${bookData.author}</span></p>
          <p class="info">GENRE: <span>${bookData.genre}</span></p>
          <p class="info">PAGES: <span>${bookData.pages}</span></p>
        </div>
      </div>
      <div class="single-book-description-wrapper">
        <h2 class="single-book-desc-title title-line">Description</h2>
        <p class="single-book-desc-text">${bookData.desc}</p>
        <button class="btn-back" id="btn-back">Back</button>
      </div>
    </div>
  `
  return templateSingleBook;
}


//Open Single Book page:
let openSingleBookPage = () => {
  let cardsBook = document.querySelectorAll('.card');

  cardsBook.forEach(card => {
    card.addEventListener('click', (e) => {
      singleBookWrapper.style.display = 'flex';
      homeBodyWrapper.style.display = 'none';
      booksPageBodyWrapper.style.display = 'none';
      
      let cardId = e.target.id;
      singleBookWrapper.innerHTML = templateSingleBookPage(cardId);

      backPreviousPage()
    })
  })
};

//Previous button on Single Book Page
let backPreviousPage = () => {
  let btnBack = document.getElementById('btn-back');

  btnBack.addEventListener('click', () => {
    console.log(previousPage)
    if(previousPage === "Books page") {
      booksPageBodyWrapper.style.display = 'flex';
      homeBodyWrapper.style.delay = 'none'
      singleBookWrapper.style.display = 'none'
    }
    else {
      homeBodyWrapper.style.display = 'flex';
      singleBookWrapper.style.display = 'none'
      booksPageBodyWrapper.style.display = 'none';
    }
  })
}

homePage.addEventListener('click', () => {
  homeBodyWrapper.style.display = 'grid';
  booksPageBodyWrapper.style.display = 'none';
  singleBookWrapper.style.display = 'none';

  previousPage = 'Home page';
});


booksPage.addEventListener('click', () => {
  booksPageBodyWrapper.style.display = 'block';
  homeBodyWrapper.style.display = 'none';
  singleBookWrapper.style.display = 'none';

  previousPage = 'Books page';
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