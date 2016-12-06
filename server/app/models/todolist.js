//Todolist
var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;

//db
var TodoSchema = Mongoose.Schema({
    task: {type: String, required: true}, 	
	taskAuthor: { type: Mongoose.Schema.Types.ObjectId, ref: 'User' },
	dateCreated: {type: Date, default: Date.now },	
    duedate: {type: Date, required: true, default: Date.now},	
	complete: {type: Boolean, default: false},
    priority: {type: String, default:"Medium"}
}); 

module.exports = Mongoose.model('Todo', TodoSchema);