//todolist
var express = require('express'),
	logger = require('../../config/logger'),
  	router = express.Router();
    Mongoose = require('mongoose'),
    User = Mongoose.model('User'),
    Todo = Mongoose.model('Todo'),  

module.exports = function (app) {

app.use('/api', router);  

	router.route('/todolist')	
		.get(function (req, res, next) {
            logger.log('Get all Tasks', 'verbose');
            var query = Todo.find()
            .sort(req.query.order)
            .exec()
            .then(function (result) {
            res.status(200).json(result);
            })
            .catch(function(err){
            return next(err);
            })
        	})
        .put(function (req, res, next) {
			logger.log('Update a task ' + req.body._id, 'verbose');
            var query = Todo.findOneAndUpdate(
		    { _id: req.body._id }, 
		    req.body, 
		    { new: true })
            .exec()
            .then(function (result) {
            res.status(200).json(result);
            })
            .catch(function(err){
            return next(err);
            })
			})
		.post(function(req, res, next){
			logger.log("Create a task","verbose");
            var todo = new Todo(req.body);
            todo.save()
            .then(function (result) {
            res.status(201).json(result);
            })
            .catch(function(err){
            return next(err);
        	});
		    });

        router.route('/todolist/:id')
    	.get(function (req, res, next) {
            logger.log('Get a Task ' + req.params.id, 'verbose');
            var query = Todo.find({ _id: req.params.id }).exec()
            .then(function (result) {
            res.status(200).json(result);
            })
            .catch(function(err){
            return next(err);
            })
            })
        .delete(function (req, res, next) {
            logger.log('Delete a task ' + req.params.id, 'verbose');
            var query = Todo.remove({ _id: req.params.id })
            .exec()
            .then(function (result) {
            res.status(200).json({ message: 'Task deleted' });
            })
            .catch(function (err) {
            return next(err);
            });
            })

        router.route('/todolist/usertask/:id')
		//Display all the tasks created by a user
        .get( function(req, res,next){
			logger.log('Get User tasks ' + req.params.id, 'verbose');
			Todo.find({taskAuthor: req.params.id})
			.populate('taskAuthor')
			.sort("-dateCreated")
			.exec()
			.then(function(todo){
				res.status(200).json(todo);
			})
			.catch(function(err){
				return next(err);
			})
		    });
}
