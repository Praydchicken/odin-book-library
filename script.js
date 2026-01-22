const modal = document.querySelector('.js-modal');
const form = document.querySelector('.js-form');
const titleInput = document.querySelector('#title');
const authorInput = document.querySelector('#author');
const pagesInput = document.querySelector('#pages');
const isReadCheckbox = document.querySelector('#read-status');
const addBookButton = document.querySelector('.js-add-book');
const cancelButton = document.querySelector('.js-cancel');

const bookLibrary = [];

const getBookData = () => {
	return {
		title: titleInput.value,
		author: authorInput.value,
		pages: Number(pagesInput.value),
		isRead: isReadCheckbox.checked
	}
};

const openModal = () => {
	modal.showModal();
};

const closeModal = () => {
	form.reset();
	modal.close();
};

const handleModalOutsideClick = (event) => {
	if (event.target === modal) {
		modal.close();
	}
};

const handleFormSubmit = (event) => {
	event.preventDefault();

	const bookData = getBookData();
	addBook(bookData);

	form.reset();
	modal.close();
};

addBookButton.addEventListener('click', openModal);
cancelButton.addEventListener('click', closeModal);
modal.addEventListener('click', handleModalOutsideClick);
form.addEventListener('submit', handleFormSubmit);

function Book({title, author, pages, isRead}) {
	this.id = crypto.randomUUID();
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.isRead = isRead;
}

Book.prototype.toggleIsRead = function () {
	this.isRead = !this.isRead;
	console.log(this.isRead);
}

function addBook(bookData) {
	const book = new Book(bookData);
	bookLibrary.push(book);
}

function createBookCard(book) {
	const card = document.createElement('div');
	card.className = 'book__card';
	card.dataset.bookId = book.id;

 if (book.isRead) {
    const badge = document.createElement('div');
    badge.className = 'book__badge';

    const icon = document.createElement('span');
    icon.className = 'material-symbols-outlined';
    icon.textContent = 'done_all';

    const text = document.createElement('p');
    text.textContent = 'Completed';

    badge.append(icon, text);
    card.append(badge);
  }

	const bookTitle = document.createElement('h3');
	bookTitle.className = 'book__title';
	bookTitle.textContent = book.title;

	const bookAuthor = document.createElement('p');
	bookAuthor.className = 'book__author';
	bookAuthor.textContent = `by ${book.author}`;

	const bookPages = document.createElement('p');
	bookPages.className = 'book__pages'
	bookPages.textContent = `${book.pages} pages`;

	const bookActions = document.createElement('div');
	bookActions.className = 'book__actions';

	const toggleReadButton = document.createElement('button');
	toggleReadButton.classList.add('button', 'button__primary');
	toggleReadButton.textContent = book.isRead ? 'Not Read' : 'Read';

	const removeBookButton = document.createElement('button');
	removeBookButton.classList.add('button', 'button__secondary');
	removeBookButton.textContent = 'Remove';

	bookActions.append(toggleReadButton, removeBookButton);
	card.append(bookTitle, bookAuthor, bookPages, bookActions);

	return card;
}

function updateDisplay() {
	bookLibrary.forEach((book) => {
		const card = createBookCard(book);
		bookContainer.append(card);
	});
}
