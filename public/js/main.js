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
    movies.map(movie => {
            const genre = movie.children[2].innerText.toLowerCase()
            genre.includes(filterText)
                ? movie.removeAttribute('hidden')
                : movie.setAttribute('hidden', '')
        })
}

function removeListPreference() {
    localStorage.clear()
}


// TEST STUFF

const infoBtn = document.querySelectorAll('.info')

Array.from(infoBtn).forEach((el)=>{
    el.addEventListener('click', getTitle)
})


async function getMovieDetails(movieTitle){
    const movie = movieTitle
    try{
        const response = await fetch(`https://www.omdbapi.com/?apikey=6aa0401f&t=${movieTitle}`)
        const data = await response.json()
        if(data){
            document.getElementById('movieImage').src = data.Poster
            document.getElementById('movieTitle').innerText = data.Title
            document.getElementById('movieDescrip').innerText= data.Plot
            document.getElementById('movieGenre').innerText = data.Genre
            // document.getElementById('movieYear').innerText = data.Year
            document.getElementById('movieRTRating').innerText = data.Ratings[1].Value
            console.log(data)
        }
        //location.reload()
    }catch(err){
        console.log(err)
    }
}

async function getTitle(){
    const todoId = this.parentNode.dataset.id
    try{
        const response = await fetch(`movie/${todoId}`)
        const data = await response.json()
        console.log(data)
        let movieTitle = data.todo
         getMovieDetails(movieTitle)

    
        //location.reload()
    }catch(err){
        console.log(err)
    }

}



//To open popup with movie details
let popup = document.getElementById('popup');

function openPopup(){
    popup.classList.add('open-popup');
    // body.classList.add('is-blurred')
    document.getElementById('header').classList.add('is-blurred');
    document.getElementById('form').classList.add('is-blurred');
    document.getElementById('watchList').classList.add('is-blurred')
    document.getElementById('formSort').classList.add('is-blurred')
    document.getElementById('moviesToWatchHeader').classList.add('is-blurred')
    document.getElementById('moviesToWatchHeader').classList.add('is-blurred')
    document.getElementById('homeButton').classList.add('is-blurred')
    document.getElementById('logoutButton').classList.add('is-blurred')

}

function closePopup(){
    popup.classList.remove('open-popup')
    document.getElementById('header').classList.remove('is-blurred');
    document.getElementById('form').classList.remove('is-blurred');
    document.getElementById('watchList').classList.remove('is-blurred')
    document.getElementById('formSort').classList.remove('is-blurred')
    document.getElementById('moviesToWatchHeader').classList.remove('is-blurred')
    document.getElementById('moviesToWatchHeader').classList.remove('is-blurred')
    document.getElementById('homeButton').classList.remove('is-blurred')
    document.getElementById('logoutButton').classList.remove('is-blurred')
    // body.classList.remove('is-blurred')
}

