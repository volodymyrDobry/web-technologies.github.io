let books = [];

function addBook(title, author, genre, pages) {
    books.push({
        title: title,
        author: author,
        genre: genre,
        pages: pages,
        isAvailable: true,
    });
}

function removeBook(title) {
    let index = books.findIndex(book => book.title === title);
    if (index !== -1) {
        books.splice(index, 1);
    }
}

function findBookByAuthor(author) {
    return books.filter(book => book.author === author);
}

function toggleBookAvailability(title, isBorrowed) {
    let bookToBorrow = books.find(book => book.title === title);
    if (bookToBorrow) {
        bookToBorrow.isAvailable = !isBorrowed;
    }
}

function sortBooksByPages() {
    books.sort((book1, book2) => book1.pages - book2.pages);
}

function getBookStatistics() {
    let amountOfBooks = books.length;
    let amountOfAvailableBooks = books.filter(book => book.isAvailable === true).length;
    let amountOfToggledBooks = books.filter(book => !book.isAvailable).length;

    let totalPages = books.reduce((sum, book) => sum + book.pages, 0);
    let averageBookPagesLength = amountOfBooks > 0 ? totalPages / amountOfBooks : 0;

    return {
        amountOfBooks: amountOfBooks,
        averageBookPagesLength: averageBookPagesLength,
        amountOfAvailableBooks: amountOfAvailableBooks,
        amountOfToggledBooks: amountOfToggledBooks,
    };
}

function libraryManagement() {
    books = [
        { title: "The Hidden Treasure", author: "John Doe", genre: "Fantasy", pages: 255, isAvailable: true },
        { title: "The Lost Kingdom", author: "Alice Smith", genre: "Adventure", pages: 320, isAvailable: true },
        { title: "Shadows of the Past", author: "Robert Brown", genre: "Mystery", pages: 280, isAvailable: true },
        { title: "Beyond the Stars", author: "Emily Carter", genre: "Science Fiction", pages: 400, isAvailable: true },
        { title: "Echoes of the Heart", author: "Michael Johnson", genre: "Romance", pages: 230, isAvailable: true },
        { title: "The Forbidden Spell", author: "Sophia Williams", genre: "Fantasy", pages: 350, isAvailable: true }
    ];

    addBook("New Book", "Author", "Genre", 123);
    console.log("Added New Book");
    console.log(books);

    removeBook("New Book");
    console.log("Removed New Book");
    console.log(books);

    let author = "John Doe";
    let booksByAuthor = findBookByAuthor(author);
    console.log(`Books by author ${author}:`);
    console.log(booksByAuthor);

    let bookName = "The Hidden Treasure";
    toggleBookAvailability(bookName, true);
    console.log(`Toggled Book Availability for ${bookName}`);
    console.log(books);

    console.log("Sorted Books by Page Count");
    sortBooksByPages();
    console.log(books);

    console.log("Book Statistics");
    console.log(getBookStatistics());
}

libraryManagement();
