const deleteBtn = document.querySelectorAll('.del')
const todoItem = document.querySelectorAll('span.not')
const todoComplete = document.querySelectorAll('span.completed')

const sortSelector = document.querySelector('#sortID').addEventListener('change', displaySortedMovies)

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

function displaySortedMovies(e) {
    console.log(e.target.value);
    const sortedBy = e.target.value
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