const mongoose = require('mongoose');


const DataSchema = mongoose.Schema({
    userName: {type: String, unique:true},
    TodoSubject: {type: String},
    TodoDescription: {type: String},
    TodoStatus: {type: String, default:"New"},
    TodoDate: {type: String, default: Date.now()}

},{versionKey:false});

const ToDoListModel = mongoose.model('Todolist', DataSchema)

module.exports = ToDoListModel