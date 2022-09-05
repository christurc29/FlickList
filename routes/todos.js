const express = require('express')
const router = express.Router()
const todosController = require('../controllers/todos')
const { ensureAuth } = require('../middleware/auth')

router.get('/', ensureAuth, todosController.getTodos)

router.get('/sortByGenre', todosController.sortByGenre)

router.post('/createTodo', todosController.createTodo)

router.put('/toggleCompleted', todosController.toggleCompleted)

router.delete('/deleteTodo', todosController.deleteTodo)

module.exports = router