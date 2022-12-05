'use strict'

// ${book.imgUrl}
function onInit() {
    renderBooks()
}

function renderBooks() {
    var books = getBooks()
    var strHtmls = books.map(book => `
    <tr>
    <th>${book.id}</th> 
    <th>${book.name}</th> 
    <th><img src="img/${book.imgUrl}.jpg"></th> 
    <th>${book.price +'$'}</th>
    <th><button class="read" onclick="onReadBook('${book.name}','${book.price}')">Read</button><button class="update" onclick="onUpdateBook('${book.id}')">Update</button><button class="delete" onclick="onDelete('${book.id}')">Delete</button></th>
    </tr>
        `
    )
    document.querySelector('tbody').innerHTML = strHtmls.join('')
}

function onDelete(bookId) {
    deleteBook(bookId)
    renderBooks()

}
function onAddBook() {
    const bookName = prompt('What is the name of the book?')
    const bookPrice = prompt('What is the price of the book?')
    addBook(bookName, bookPrice)
    renderBooks()
}

function onUpdateBook(bookId) {
    const book = getBookById(bookId)
    const newPrice = prompt('What is the updated price?')
    if (newPrice && newPrice !== book.price) {
        updateBook(bookId, newPrice)
        renderBooks()
    }
}

function onReadBook(name, price) {
    readBook(name)
    var elModal = document.querySelector('.modal')
    elModal.querySelector('h3').innerText = name
    elModal.querySelector('h4 span').innerText = price +'$'
    elModal.querySelector('p').innerText = makeLorem(80)
    elModal.classList.add('open')
}

function onCloseModal() {
    var rate = resetRate()
    var elRate = document.querySelector('.rate-screen')
    elRate.innerText = rate
    var elModal = document.querySelector('.modal')
    elModal.classList.remove('open')
}

function onRateBook(sign) {
    const rate = updateRate(sign)
    var elRate = document.querySelector('.rate-screen')
    elRate.innerText = rate
}

function onSearchBy (ev){
    ev.preventDefault()
    const elTxt = document.querySelector('input[name="txt-filter"]')
    var filterBy = {searchBy : elTxt.value}
    // console.log(filterBy)
    setBookFilter(filterBy)
    elTxt.value = ''
    renderBooks()
}

function onSetFilterBy(filterBy) {
    filterBy = setBookFilter(filterBy)
    renderBooks()
    
    const queryStringParams = `?maxPrice=${filterBy.maxPrice}&minRate=${filterBy.minRate}`
    const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + queryStringParams
    window.history.pushState({ path: newUrl }, '', newUrl)

}

function onChangePage(direction) {
    var pageNum = changePage(direction)
    if (pageNum === '') {
        document.getElementById('next').disabled = false
        document.getElementById("prev").disabled = false
    } else if(pageNum === 'prev') {
        document.getElementById("prev").disabled = true
    } else if(pageNum === 'next') {
        document.getElementById('next').disabled = true
    } 
    renderBooks()
}
