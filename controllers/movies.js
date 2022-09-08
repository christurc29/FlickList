const Todo = require('../models/Todo')

module.exports = {
    getMovieTitle: async (req, res) => {

        try {
            const movieFound = await Todo.findById(req.params.id);
            if(!movieFound) {
                return res.status(404).end()
            }
            return res.status(200).json(movieFound)
        } catch (error) {
            next(error)
        }
        
    }


}