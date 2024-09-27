const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;

    this.info = function() {
        let res = `${this.title} by ${this.author}, ${Number(this.pages)} pages, `;
        if (read) res += "have read";
        else res += "not read yet";
        return res;
    }
}

function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
}

function bookDisplay() {
    let container = document.querySelector(".book_display");
    for (let book of myLibrary) {
        let child = document.createElement('h2');
        child.textContent = book.info();
        container.appendChild(child);
    }
}

function openModal() {
    // console.log("hello");
    const dialog = document.querySelector("dialog");
    // const showButton = document.querySelector("#showButton + dialog");
    dialog.showModal();
    // showButton.addEventListener("click", () => {
        
    // })
}

addBookToLibrary('The Hobbit', 'J.R.R. Tolikein', 295, false);
addBookToLibrary('Harry Potter', 'J.K Rowling', 682, true);
// console.log(myLibrary);
// bookDisplay();
bookDisplay();

