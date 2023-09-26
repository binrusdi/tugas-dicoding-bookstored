// Fungsi untuk mendapatkan data buku dari localStorage
function getBookShelf() {
    const bookShelfData = localStorage.getItem('bookShelf');
    return bookShelfData ? JSON.parse(bookShelfData) : { unread: [], read: []}
}

// Fungsi untuk menyimpan data buku ke localStorage
function saveBookShelf(bookShelf) {
    localStorage.setItem('bookShelf', JSON.stringify(bookShelf));
}

// Fungsi untuk menambahkan buku baru
function addBook(title, author, year, isComplete) {
    const bookShelf = getBookShelf();

    const newBook = {
        id: +new Date(),
        title,
        author,
        year,
        isComplete
    };

    if (isComplete) {
        bookShelf.read.push(newBook);
    } else {
        bookShelf.unread.push(newBook);
    }

    saveBookShelf(bookShelf);
}

// Fungsi untuk menghapus buku
function removeBook(id) {
    const bookShelf = getBookShelf();
    bookShelf.unread = bookShelf.unread.filter(book => book.id !== id);
    bookShelf.unread = bookShelf.read.filter(book => book.id !== id);
    
    saveBookShelf(bookShelf);
}

// Panggil fungsi addBook() ketika form disubmit
document.querySelector('form').addEventListener('submit', function (event) {
    event.preventDefault();
    const title = document.getElementById('judul').value;
    const author = document.getElementById('penulis').value;
    const year = parseInt(document.getElementById('tahun').value, 10);
    const isComplete = document.getElementById('complete').checked;

    addBook(title, author, year, isComplete);

    window.location.reload();
});

// Menampilkan data read dan unread

