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
}
