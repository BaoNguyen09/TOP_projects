const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;

    this.info = function() {
        let res = `${this.title} by ${this.author}, ${Number(this.pages)} pages, `;
        if (this.read) res += "have read";
        else res += "not read yet";
        return res;
    }

}

Book.prototype.changeStatus = function() {
    this.read =  !this.read;
}

function addBookToLibrary(title, author, pages, read) {
    // console.log(title);
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
}

function formSubmission(event) {
    event.preventDefault();
    console.log(event.target.title.value);
    let title = event.target.title.value;
    let author = event.target.author.value;
    let pages = event.target.pages.value;
    let read = event.target.read.checked;
    console.log(read);
    addBookToLibrary(title, author, pages, read);
    bookDisplay();
    document.querySelector("form").reset();
    // console.log(myLibrary);
}

function removeBook(Id) {
    
}

function bookDisplay() {
    let container = document.querySelector(".book_display");
    // for (let book of myLibrary) {
    if (myLibrary.length > 0) {
        let child = document.createElement('h2');
        let Id = myLibrary.length-1;
        child.setAttribute("id", `book_${Id}`);
        child.textContent = myLibrary[Id].info();

        let deleteButton = document.createElement('button');
        deleteButton.textContent = "Delete Book";
        deleteButton.addEventListener('click', () => {
            myLibrary.pop(Id);
            container.removeChild(child);
        });

        let statusToggle = document.createElement('button');
        statusToggle.textContent = "Change Read Status";
        statusToggle.addEventListener("click", () => {
            myLibrary[Id].changeStatus();
            console.log(myLibrary[Id].read);
            console.log(myLibrary[Id].info());
            child.textContent = myLibrary[Id].info();
            child.appendChild(deleteButton);
            child.appendChild(statusToggle);
        });

        child.appendChild(deleteButton);
        child.appendChild(statusToggle);
        container.appendChild(child);
    }
        
    // }
}

function openModal() {
    // console.log("hello");
    const dialog = document.querySelector("dialog");
    // const showButton = document.querySelector("#showButton + dialog");
    dialog.showModal();
    // showButton.addEventListener("click", () => {
        
    // })
}

function closeModal() {
    
    const dialog = document.querySelector("dialog");
    dialog.close();
}

// addBookToLibrary('The Hobbit', 'J.R.R. Tolikein', 295, false);
// addBookToLibrary('Harry Potter', 'J.K Rowling', 682, true);
// console.log(myLibrary);
// bookDisplay();
document.onload = bookDisplay();

