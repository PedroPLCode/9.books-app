/* eslint-disable indent */

const select = {
    templateOf: {
        book: '#template-book',
    },
    listOf: {
        books: '.books-list',
        images: 'book__image',
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
    const HTMLelement = templates.booksList(singleBook);
    const DOMelement = utils.createDOMFromHTML(HTMLelement);
    booksListElement.appendChild(DOMelement);
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

    const bookToHide = document.querySelector('.book__image[data-id="' + singleBook.id + '"]'); 
    if (shouldBeHidden) {
      bookToHide.classList.add(select.class.hidden); 
    } else {
      bookToHide.classList.remove(select.class.hidden); 
    }
  }
}

render(dataSource.books);
initActions();

