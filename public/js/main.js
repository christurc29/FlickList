document.addEventListener('DOMContentLoaded', maintainListPreference)
const sortSelector = document.querySelector('#sortID').addEventListener('change', displaySortedMovies)
const filterInput = document.querySelector('#filterID').addEventListener('input', filterListByGenre)
const logoutBtn = document.querySelector('#logout').addEventListener('click', removeListPreference)

const deleteBtn = document.querySelectorAll('.del')
const movieDetails = document.querySelectorAll('.details')

Array.from(deleteBtn).forEach((el)=>{
    el.addEventListener('click', deleteTodo)
})

Array.from(movieDetails).forEach((el)=>{
    el.addEventListener('click', toggleCompleted)
})

async function deleteTodo(){
    const todoId = this.parentNode.dataset.id
    try{
        const response = await fetch('todos/deleteTodo', {
            method: 'delete',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'todoIdFromJSFile': todoId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

async function toggleCompleted(e) {
    const todoId = this.parentNode.dataset.id
    const completed = e.target.className.includes('completed')
    try{
        const response = await fetch('todos/toggleCompleted', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'todoIdFromJSFile': todoId,
                completed
            })
        })
        const data = await response.json()
        console.log(data)
        toggleCompletedStyle(this.parentNode)
        updateMoviesLeftDisplay()
    }catch(err){
        console.log(err)
    }
}

function toggleCompletedStyle(listItem) {
    Array.from(listItem.children, (span, index) => {
        if (index !== listItem.children.length - 1) {
            const classes = span.classList
            classes.contains('not')
                ? (classes.remove('not'), classes.add('completed'))
                : (classes.remove('completed'), classes.add('not'))
        }
    })
}

function updateMoviesLeftDisplay() {
    const h2 = document.querySelector('h2')
    const moviesLeft = document.querySelectorAll('.not').length / 2
    h2.innerText = h2.innerText
        .split(' ')
        .slice(0, 2)
        .concat(
            moviesLeft,
            h2.innerText.split(' ').slice(3)
        )
        .join(' ')
}

function maintainListPreference() {
    console.log('New load, who dis?')
    const sortPreference = window.localStorage.getItem('sortPreference')
    const filterPreference = window.localStorage.getItem('filterPreference')

    if (sortPreference) {
        const select = document.querySelector('#sortID')
        select.value = sortPreference
        select.dispatchEvent(new Event('change'))
    }
    if (filterPreference) {
        const input = document.querySelector('#filterID')
        input.value = filterPreference
        input.dispatchEvent(new Event('input'))
    }
}

function displaySortedMovies(e) {
    const sortedBy = e.target.value
    window.localStorage.setItem('sortPreference', sortedBy)
    const domFragment = document.createDocumentFragment()
    const movieList = document.querySelector('ul')
    const movies = Array.from(document.querySelectorAll('.todoItem'))
    sortMovies(movies, sortedBy)
        .forEach(movie => {
            domFragment.appendChild(movie)
        })
    movieList.appendChild(domFragment)
}

function sortMovies(list, criteria) {
    return list
        .slice()
        .sort((a, b) => {
            if (criteria === 'title' || criteria === 'genre') {
                return criteria === 'title'
                    ? a.children[0].innerText.localeCompare(b.children[0].innerText)
                    : a.children[1].innerText.localeCompare(b.children[1].innerText)
                        || a.children[0].innerText.localeCompare(b.children[0].innerText)
            } else {
                return criteria === 'oldest'
                    ? new Date(a.dataset.createdat) - new Date(b.dataset.createdat)
                    : new Date(b.dataset.createdat) - new Date(a.dataset.createdat)
            }
        })
}

function filterListByGenre(e) {
    const filterText = e.target.value.toLowerCase().trim()
    window.localStorage.setItem('filterPreference', filterText)
    const movies = Array.from(document.querySelectorAll('.todoItem'))
    movies
        .map(movie => {
            const genre = movie.children[1].innerText.toLowerCase()
            genre.includes(filterText)
                ? movie.removeAttribute('hidden')
                : movie.setAttribute('hidden', '')
        })
}

function removeListPreference() {
    localStorage.clear()
}

