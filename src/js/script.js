/* eslint-disable indent */

const select = {
    templateOf: {
        book: '#template-book',
    },
    listOf: {
        books: '.books-list',
        images: 'book__image',
        ratings: '.book__rating__fill',
    },
    atributes: {
        dataId: 'data-id',
    },
    class: {
        favorite: 'favorite',
        hidden: 'hidden',
    },
    filters: '.filters',
};

const templates = {
    booksList: Handlebars.compile(document.querySelector(select.templateOf.book).innerHTML),
  };

const favouriteBooks = [];

const filters = [];


function render(listOfBooks) {
  const booksListElement = document.querySelector(select.listOf.books);

  for (let singleBook of listOfBooks) {
    const ratingBgc = determineRatingBgc(singleBook.rating);
    const ratingWidth = determineRatingWidth(singleBook.rating);
    const HTMLelement = templates.booksList(singleBook);
    const DOMelement = utils.createDOMFromHTML(HTMLelement);
    booksListElement.appendChild(DOMelement);

    const ratingFill = DOMelement.querySelector(select.listOf.ratings);
    ratingFill.style.width = ratingWidth;
    ratingFill.style.background = ratingBgc;
  }
}


function initActions() {
  const booksList = document.querySelector(select.listOf.books);
  const filtersList = document.querySelector(select.filters);

  booksList.addEventListener('dblclick', function(event){
    event.preventDefault();

    const clickedBook = event.target.offsetParent;

    if (clickedBook.classList.contains(select.listOf.images)) {

    const bookId = clickedBook.getAttribute(select.atributes.dataId);

      if (favouriteBooks.includes(bookId)) {
        clickedBook.classList.remove(select.class.favorite);
        favouriteBooks.pop(bookId);
      } else {
        clickedBook.classList.add(select.class.favorite);
        favouriteBooks.push(bookId);
      }
    }
  });

  filtersList.addEventListener('click', function(event) {

  const filterClicked = event.target.tagName == 'INPUT' &&
                          event.target.name == 'filter' &&
                          event.target.type == 'checkbox';

   if (filterClicked) {

    if (event.target.checked) {
      filters.push(event.target.value);
    } else {
      const indexToRemove = filters.indexOf(event.target.value);
      filters.splice(indexToRemove, 1);
    }
   }

   filterBooks();
  });
}


function filterBooks() {

  for (let singleBook of dataSource.books) {
    let shouldBeHidden = false;

    for (let singleFilter of filters) {
     if (!singleBook.details[singleFilter]) {
      shouldBeHidden = true;
     }
    }

    const bookToHide = document.querySelector('.' + select.listOf.images + '[' + select.atributes.dataId + '="' + singleBook.id + '"]'); 
    if (shouldBeHidden) {
      bookToHide.classList.add(select.class.hidden); 
    } else {
      bookToHide.classList.remove(select.class.hidden); 
    }
  }
}


function determineRatingBgc(rating) {
  if (rating < 6) {
    return 'linear-gradient(to bottom, #fefcea 0%, #f1da36 100%)';
  } else if (rating < 8) {
    return 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
  } else if (rating < 9) {
    return 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
  } else {
    return 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
  }
}


function determineRatingWidth(rating) {
  return (rating * 10 + '%');
}

render(dataSource.books);
initActions();

