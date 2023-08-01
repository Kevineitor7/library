const formButton = document.querySelector('#submit')
const form = document.getElementById('form')
let title = document.getElementById('title')
let author = document.getElementById('author')
let pages = document.getElementById('pages')
let read = document.getElementById('read')
let reading = document.getElementById('reading')
let notRead = document.getElementById('not-read')
let gridContainer = document.querySelector('.grid-container')

let library = []

class Book {
    constructor(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
    }
    info() {
        if (this.read == 'yes') {
            return (this.title + ' by ' + this.author + ' has ' + this.pages + ' pages, already read')
        } else if (this.read == 'now') {
            return (this.title + ' by ' + this.author + ' has ' + this.pages + ' pages, currently reading')
        } else if (this.read == 'no') {
            return (this.title + ' by ' + this.author + ' has ' + this.pages + ' pages, not read yet')
        } 
    }
}

function addBookToLibrary(event) {
    event.preventDefault()

    if (title.value == '' || author.value == '' || pages.value == '') {
        return 
    } else if (read.checked) {
        let book = new Book(title.value, author.value, pages.value, 'yes')
        library.push(book)
        displayBook(book)
        form.reset()
    } else if (reading.checked) {
        let book = new Book(title.value, author.value, pages.value, 'now')
        library.push(book)
        displayBook(book)
        form.reset()
    } else if (notRead.checked) {
        let book = new Book(title.value, author.value, pages.value, 'no')
        library.push(book)
        displayBook(book)
        form.reset()
    } 
        
}




function displayBook(item) {
        
        let gridItem = document.createElement('div')
        let bookDescription = document.createElement('span')
        let bookOptions = document.createElement('span')
        let toggleButton = document.createElement('button')
        let removeButton = document.createElement('button')
        let tooltipRead = document.createElement('span')
        let tooltipRemove = document.createElement('span')
        
        gridItem.classList.add('grid-item')
        gridContainer.appendChild(gridItem)

        bookDescription.classList.add('book-description')
        bookDescription.innerHTML = item.info()
        gridItem.appendChild(bookDescription)

        bookOptions.classList.add('book-options')
        gridItem.appendChild(bookOptions)

        toggleButton.id = 'toggle-button'
        toggleButton.classList.add('read')
        if (item.read == 'yes') {
            toggleButton.innerHTML = 'Read'
        } else if (item.read == 'now') {
            toggleButton.innerHTML = 'Reading'
        } else if (item.read == 'no') {
            toggleButton.innerHTML = 'Not Read'
        }
        bookOptions.appendChild(toggleButton)

        removeButton.id = 'remove-button'
        removeButton.innerHTML = 'Remove'
        bookOptions.appendChild(removeButton)
        
        tooltipRead.classList.add('tooltip')
        tooltipRead.innerHTML = 'Toggle reading status'
        toggleButton.appendChild(tooltipRead)
        
        tooltipRemove.classList.add('tooltip')
        tooltipRemove.innerHTML = 'Double click to remove book'
        removeButton.appendChild(tooltipRemove)

        toggleButton.addEventListener('click', () => {
            if (item.read == 'yes') {
                    item.read = 'now'
                    toggleButton.innerHTML = 'Reading'
                    bookDescription.innerHTML = item.info()
            } else if (item.read == 'now') {
                item.read = 'no'
                toggleButton.innerHTML = 'Not Read'
                bookDescription.innerHTML = item.info()
            } else {
                item.read = 'yes'
                toggleButton.innerHTML = 'Read'
                bookDescription.innerHTML = item.info()
            }
        })

        removeButton.addEventListener('dblclick', () => {
            gridItem.remove()
            let index = library.indexOf(item)
            library.splice(index, 1)
        })
    }

formButton.addEventListener('click', addBookToLibrary)


