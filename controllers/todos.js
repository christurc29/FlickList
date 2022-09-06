const Todo = require('../models/Todo');

module.exports = {
	getTodos: async (req, res) => {
		console.log(req.user);
		try {
			const todoItems = await Todo.find({ userId: req.user.id });
			const itemsLeft = await Todo.countDocuments({
				userId: req.user.id,
				completed: false,
			});
			res.render('todos.ejs', {
				message: req.flash('message'),
				todos: todoItems,
				left: itemsLeft,
				user: req.user,
			});
		} catch (err) {
			console.log(err);
		}
	},
	createTodo: async (req, res) => {
		try {
			const query = req.body.todoItem;
			const duplicate = await Todo.findOne({ todo: query });
			if (duplicate) {
				console.log('This has already been saved.');
				req.flash('message', 'You already added this movie.');
				res.redirect('/todos');
			} else {
				Todo.create({
					todo: req.body.todoItem,
					genre: req.body.movieGenre,
					completed: false,
					userId: req.user.id,
					createdDate: Date(),
				});
				console.log('Todo has been added!');
				res.redirect('/todos');
			}
		} catch (err) {
			console.log(err);
		}
	},
	toggleCompleted: async (req, res) => {
		console.log(req.body);
		try {
			await Todo.findOneAndUpdate(
				{ _id: req.body.todoIdFromJSFile },
				{
					completed: !req.body.completed,
				}
			);
			console.log('Completed Status Changed');
			res.json('Completed Status Changed');
		} catch (err) {
			console.log(err);
		}
	},
	deleteTodo: async (req, res) => {
		console.log(req.body.todoIdFromJSFile);
		try {
			await Todo.findOneAndDelete({ _id: req.body.todoIdFromJSFile });
			console.log('Deleted Todo');
			res.json('Deleted It');
		} catch (err) {
			console.log(err);
		}
	},
	sortByGenre: async (req, res) => {
		try {
			await Todo.find({ userId: req.user.id }).sort({ genre: -1 }).toArray();
			res.redirect('/todos');
		} catch (err) {
			console.log(err);
		}
	},
};
