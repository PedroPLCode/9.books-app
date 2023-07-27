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
    }
};

const templates = {
    booksList: Handlebars.compile(document.querySelector(select.templateOf.book).innerHTML),
  };

const favouriteBooks = [];


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
}

render(dataSource.books);
initActions();

