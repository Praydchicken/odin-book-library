const bookLibrary = [];

function Book(title, author, pages) {
	this.id = crypto.randomUUID();
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.isRead = true;
}

Book.prototype.toggleIsRead = function () {
	this.isRead = !this.isRead;
	console.log(this.isRead);
}
