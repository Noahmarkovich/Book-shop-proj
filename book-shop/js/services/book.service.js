'use strict'

const STORAGE_KEY = 'bookDB'
const gBooksNames = ['In Search of Lost Time', 'Ulysses', 'Don Quixote', 'One Hundred Years of Solitude','The Great Gatsby',  'Moby Dick', 'War and Peace', 'Madame Bovary', 'Anna Karenina', 'Alices Adventures in Wonderland']
const PAGE_SIZE = 4

var gBooks
var gRate = 0
var gCurrBook
var gFilterBy ={ minRate: 0, maxPrice: 50 , searchBy : ''}
var gPageIdx = 0 

_createBooks()



function changePage(direction) {
    if (direction > 0 )
        gPageIdx++
    else if(direction < 0){
        gPageIdx--
    }
    if (gPageIdx * PAGE_SIZE >= gBooks.length -1 ) {
        return 'next'
    } else if (gPageIdx<=0) {
        return 'prev'
    } else {
        return ''
    }
}


function getBooks(){
    var books = gBooks.filter(book => book.price < +gFilterBy.maxPrice && 
        book.rate >= +gFilterBy.minRate &&
        book.name.includes(gFilterBy.searchBy)) 
        
    var startIdx = gPageIdx * PAGE_SIZE
    return books.slice(startIdx, startIdx + PAGE_SIZE)       
        
}

function _createBook(name, price = getRandomIntInclusive(5, 20), rate=0, imgUrl='book') {
    return {
        id: makeId(),
        name: name,
        price ,
        imgUrl: (gBooksNames.includes(name)? name : 'book'),
        rate
    }
}

function _createBooks() {
    var books = loadFromStorage(STORAGE_KEY)
    // Nothing in storage - generate demo data
    if (!books || !books.length) {
        books = []
        for (let i = 0; i < 10; i++) {
            var bookName = gBooksNames[getRandomIntInclusive(0, gBooksNames.length - 1)]
            books.push(_createBook(bookName))
        }
    }
    gBooks = books
    _saveBooksToStorage()
}

function _saveBooksToStorage() {
    saveToStorage(STORAGE_KEY, gBooks)
}

function deleteBook(bookId){
    const bookIdx = gBooks.findIndex(book=> book.id === bookId)
    console.log(bookId)
    gBooks.splice(bookIdx,1)
    _saveBooksToStorage()
}

function addBook(bookName, bookPrice){
    const book = _createBook(bookName, bookPrice)
    gBooks.unshift(book)
    _saveBooksToStorage()
}

function updateBook(bookId, newPrice){
    const book = getBookById(bookId)
    book.price = newPrice 
    _saveBooksToStorage()
}

function readBook(name){
    const book = gBooks.find(book => book.name === name)
    gCurrBook =book
    return gCurrBook
}

function updateRate(sign){
    if(sign === '+' && gRate < 10){
        gRate ++ 
        gCurrBook.rate = gRate
        _saveBooksToStorage()
    }
    else if(sign === '-' && gRate > 0){
        gRate -- 
        gCurrBook.rate = gRate
        _saveBooksToStorage()
    } else return gRate
    return gRate
}



function setBookFilter(filterBy = {}){
    gPageIdx = 0
    if (filterBy.maxPrice !== undefined) gFilterBy.maxPrice = filterBy.maxPrice
    if (filterBy.minRate !== undefined) gFilterBy.minRate = filterBy.minRate
    if (filterBy.searchBy !== undefined) gFilterBy.searchBy = filterBy.searchBy
    return gFilterBy
}


function resetRate(){
    gRate = 0
    console.log(gRate)
    return gRate
    
}

function getBookById(bookId) {
    const book = gBooks.find(book => book.id === bookId)
    return book
}

