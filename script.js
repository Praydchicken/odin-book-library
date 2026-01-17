const modalElement = document.querySelector('.js-modal');
const formElement = document.querySelector('.js-form');
const titleInputElement = document.querySelector('#title');
const authorInputElement = document.querySelector('#author');
const pagesInputElement = document.querySelector('#pages');
const isReadCheckboxElement = document.querySelector('#read-status');
const addBookButtonElement = document.querySelector('.js-add-book');
const cancelButtonElement = document.querySelector('.js-cancel');

const bookLibrary = [];

addBookButtonElement.addEventListener('click', () => {
	modalElement.showModal();
});

modalElement.addEventListener('click', (event) => {
	if (event.target === modalElement || event.target === cancelButtonElement) {
		modalElement.close();
	}
});

formElement.addEventListener('submit', (event) => {
	event.preventDefault();
	addBook();
});

function Book(title, author, pages, isRead) {
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

function addBook() {
	const title = titleInputElement.value;
	const author = authorInputElement.value;
	const pages = Number(pagesInputElement.value);
	const isRead = isReadCheckboxElement.checked ? true : false;

	const book = new Book(title, author, pages, isRead);
	bookLibrary.push(book);
	formElement.reset();
	modalElement.close();
}
