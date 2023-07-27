/* eslint-disable indent */

const select = {
    templateOf: {
        book: '#template-book',
    },
    listOf: {
        books: '.books-list',
        images: '.book__image',
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
  const booksImagesList = document.querySelectorAll(select.listOf.images);

  for (let singleBookImage of booksImagesList) {
    singleBookImage.addEventListener('dblclick', function(event){
      event.preventDefault();
      singleBookImage.classList.toggle(select.class.favorite);
      const bookId = singleBookImage.getAttribute('data-id');

      if (!favouriteBooks.includes(bookId)) {
        favouriteBooks.push(bookId);
      }
    });
  }
}

render(dataSource.books);
initActions();

