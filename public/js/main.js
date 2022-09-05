document.addEventListener('DOMContentLoaded', maintainListPreference)
const sortSelector = document.querySelector('#sortID').addEventListener('change', displaySortedMovies)
const filterInput = document.querySelector('#filterID').addEventListener('input', filterListByGenre)
const logoutBtn = document.querySelector('#logout').addEventListener('click', removeListPreference)

const deleteBtn = document.querySelectorAll('.del')
const todoItem = document.querySelectorAll('span.not')
const todoComplete = document.querySelectorAll('span.completed')

Array.from(deleteBtn).forEach((el)=>{
    el.addEventListener('click', deleteTodo)
})

Array.from(todoItem).forEach((el)=>{
    el.addEventListener('click', markComplete)
})

Array.from(todoComplete).forEach((el)=>{
    el.addEventListener('click', markIncomplete)
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

async function markComplete(){
    const todoId = this.parentNode.dataset.id
    try{
        const response = await fetch('todos/markComplete', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'todoIdFromJSFile': todoId
            })
        })
        const data = await response.json()
        console.log(data)
        // location.reload()
        toggleCompletedStyle(this.parentNode)
    }catch(err){
        console.log(err)
    }
}

async function markIncomplete(){
    const todoId = this.parentNode.dataset.id
    try{
        const response = await fetch('todos/markIncomplete', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'todoIdFromJSFile': todoId
            })
        })
        const data = await response.json()
        console.log(data)
        // location.reload()
        toggleCompletedStyle(this.parentNode)
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
    // set sort preference on local storage
    window.localStorage.setItem('sortPreference', sortedBy)
    // create document fragment
    const domFragment = document.createDocumentFragment()
    // access the list of movies / ul
    const movieList = document.querySelector('ul')
    // access all the individual movies / li & store in an array
    const movies = Array.from(document.querySelectorAll('.todoItem'))

    movies // sort li elems according to the target value / option selected
      .sort((a, b) => {
          // for now only two options implemented, title or genre
          const option = sortedBy === 'title' ? 0 : 1
          const c = a.children[option].innerText,
                d = b.children[option].innerText
          return c.localeCompare(d);
      }) // add elements to fragment
      .forEach(movie => {
        domFragment.appendChild(movie)
      })
    // add fragment to movie list / ul
    movieList.appendChild(domFragment)
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

