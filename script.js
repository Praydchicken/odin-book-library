const modal = document.querySelector('.js-modal');
const form = document.querySelector('.js-form');
const bookContainer = document.querySelector('.js-books');
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
	updateDisplay();

	form.reset();
	modal.close();
};

const handleCardActions = (event) => {
	const card = event.target.closest('.book__card');

	if (!card) {
		return;
	}

	if (event.target.closest('.js-status')) {
		toggleReadStatus(card);
	} else if (event.target.closest('.js-remove')) {
		removeBook(card);
	}

	updateDisplay();
};

bookContainer.addEventListener('click', handleCardActions);
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

function removeBook(card) {
	const id = card.dataset.bookId;
	const index = bookLibrary.findIndex(book => book.id === id);

	if (index === -1) {
		return;
	}

	bookLibrary.splice(index, 1);
}

function toggleReadStatus(card) {
	const id = card.dataset.bookId;
	const book = bookLibrary.find(book => book.id === id);

	if (!book) {
		return;
	}

	book.toggleIsRead();
}


function createElement(tag, className, textContent = '') {
	const element = document.createElement(tag);

	if (className) {
		element.className = className;
	}

	if (textContent) {
		element.textContent = textContent;
	}

	return element;
}

function createBookCard(book) {
	const card = createElement('div', 'book__card');
	card.dataset.bookId = book.id;

	if (book.isRead) {
		const badge = createElement('div', 'book__badge');
		const icon = createElement('span', 'material-symbols-outlined', 'done_all');
		const text = createElement('p','','Completed');

		badge.append(icon, text);
		card.append(badge);
	}

	const bookTitle = createElement('h3', 'book__title', book.title);
	const bookAuthor = createElement('p', 'book__author', `by  ${book.author}`);
	const bookPages = createElement('p', 'book__pages', `${book.pages} pages`);

	const bookActions = createElement('div', 'book__actions');
	const toggleReadText = book.isRead ? 'Mark as Unread' : 'Mark as Read';
	const toggleReadStatus = createElement('button','button button__primary js-status', toggleReadText);
	const removeBook = createElement('button', 'button button__secondary js-remove', 'Remove');


	bookActions.append(toggleReadStatus, removeBook);
	card.append(bookTitle, bookAuthor, bookPages, bookActions);

	return card;
}

function updateDisplay() {
	const cards = bookLibrary.map((book) => createBookCard(book));
	bookContainer.replaceChildren(...cards);
}
