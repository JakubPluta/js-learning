// Book class represents a book;


class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }


}

class Store {
    static getBooks() {
        let books;
        if (localStorage.getItem('books') === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }

    static addBook(book) {
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBook(isbn) {
        const books = Store.getBooks();
        books.forEach((book, index) => {
            if (book.isbn === isbn) {
                books.splice(index, 1);
            }
        });
        localStorage.setItem('books', JSON.stringify(books));
    }
}


// UI class represents UI Taks

class UI {
    static displayBooks() {

        const books = Store.getBooks();
        books.forEach((book) => { UI.addBookToList(book) });

    }


    static addBookToList(book) {
        const list = document.querySelector('#book-list');

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
        `;
        list.appendChild(row);
    }

    static clearFields() {
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';
    }

    static deleteBook(el) {

        if (el.classList.contains('delete')) {
            el.parentElement.parentElement.remove();
        }

    }

    static showAlert(message, className) {
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(
            message
        ));
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');
        if (document.querySelector('.alert') != null) {

        } else {
            container.insertBefore(div, form);
            // Vanish in 3 second
            setTimeout(() => document.querySelector('.alert').remove(), 3000)
        }
    }
}

// eventDisplayBooks

document.addEventListener('DOMContentLoaded', UI.displayBooks);

// add books

document.querySelector('#book-form').addEventListener('submit',
    (e) => {

        // Prevent actual submit;
        e.preventDefault();

        const title = document.querySelector('#title').value;
        const author = document.querySelector('#author').value;
        const isbn = document.querySelector('#isbn').value;

        //  Instantiate book;
        const book = new Book(title, author, isbn);

        console.log(book);

        // validate

        if (title === '' || author === '' || isbn === '') {
            UI.showAlert('Please fill all fields', 'danger')
        } else {

            // addbook
            UI.addBookToList(book);

            // local store

            Store.addBook(book);

            UI.showAlert('Book added', 'success')
            // clear field;
            UI.clearFields();
        }
    })


document.querySelector('#book-list').addEventListener(
    'click', (e) => {
        UI.deleteBook(e.target);
        // delete
        
        Store.removeBook(e.target.parentElement.previousElementSibling.textContent)

        UI.showAlert(`Book removed`, 'success')
    }
)