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
function displayBookShelf() {
    const bookShelf = getBookShelf();
    const containerRead = document.getElementById('read');
    const containerUnread = document.getElementById('unread');
    
    containerRead.innerHTML = "";
    containerUnread.innerHTML = "";

    // Rak buku sudah dibaca
    bookShelf.read.forEach(book => {
        const h1 = document.createElement('H1');
        h1.textContent = "Rak Buku Selesai dibaca";
        containerRead.appendChild(h1);

        const section = document.createElement('SECTION');
        containerRead.appendChild(section);
        const h4 = document.createElement('H4');
        h4.textContent = book.title;
        section.appendChild(h4);
        const h6 = document.createElement('H6');
        h6.textContent = book.author;
        section.appendChild(h6);
        const p = document.createElement('P');
        p.textContent = book.year;
        section.appendChild(p);
        const div = document.createElement('div');
        div.textContent = "selesai dibaca";
        div.setAttribute('class', 'read')
        section.appendChild(div);
        
        const del = document.createElement('button');
        del.textContent = "Delete";
        del.setAttribute('class', 'btnDel')
        containerRead.appendChild(del);

    });

    bookShelf.unread.forEach(book => {
        const h1 = document.createElement('H1');
        h1.textContent = "Rak Buku Belum dibaca";
        containerUnread.appendChild(h1);

        const section = document.createElement('SECTION');
        containerUnread.appendChild(section);
        const h4 = document.createElement('H4');
        h4.textContent = book.title;
        section.appendChild(h4);
        const h6 = document.createElement('H6');
        h6.textContent = book.author;
        section.appendChild(h6);
        const p = document.createElement('P');
        p.textContent = book.year;
        section.appendChild(p);
        const div = document.createElement('div');
        div.textContent = "Belum dibaca";
        div.setAttribute('class', 'read')
        section.appendChild(div);

        const del = document.createElement('button');
        del.textContent = "Delete";
        del.setAttribute('class', 'btnDel')
        containerUnread.appendChild(del);
    });

}
displayBookShelf();
