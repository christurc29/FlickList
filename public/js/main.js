document.addEventListener('DOMContentLoaded', maintainSortPreference)

const deleteBtn = document.querySelectorAll('.del')
const todoItem = document.querySelectorAll('span.not')
const todoComplete = document.querySelectorAll('span.completed')

const sortSelector = document.querySelector('#sortID').addEventListener('change', displaySortedMovies)
const logoutBtn = document.querySelector('#logout').addEventListener('click', removeSortPreference)

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
        location.reload()
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
        location.reload()
    }catch(err){
        console.log(err)
    }
}

function maintainSortPreference() {
    console.log('New load, who dis?')
    const sortPreference = window.localStorage.getItem('sortPreference')

    if (sortPreference) {
        const select = document.querySelector('#sortID')
        select.addEventListener('change', () => {});
        (() => {
            select.value = sortPreference
            select.dispatchEvent(new Event('change'))
        })()
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

function removeSortPreference() {
    localStorage.removeItem('sortPreference')
}