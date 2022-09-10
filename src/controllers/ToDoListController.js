const ToDoListModel = require("../models/ToDoListModel");
const ProfileModel = require("../models/ProfileModel");

exports.CreateTodo=(req, res)=>{
    let reqBody=req.body;

    let TodoSubject = reqBody['TodoSubject']
    let TodoDescription = reqBody['TodoDescription']
    let userName = req.headers['username'];
    let TodoStatus = reqBody['TodoStatus']
    let TodoCreateDate = Date.now();
    let TodoUpdateDate = Date.now();

    let PostBody = {
        userName: userName,
        TodoSubject: TodoSubject,
        TodoDescription: TodoDescription,
        TodoStatus: TodoStatus,
        TodoCreateDate: TodoCreateDate,
        TodoUpdateDate: TodoUpdateDate
    }
    ToDoListModel.create(PostBody, (err, data)=>{
        if(err){
            res.status(400).json({status:"Fail", data: err})
        }
        else{
            res.status(200).json({status: "Success", data: data})
        }

    })
}

exports.SelectTodo=(req, res)=>{
    let userName = req.headers['username'];
    ToDoListModel.find({userName:userName}, (err,data)=>{

        if(err){
            res.status(400).json({status:"Fail", data: err})
        }
        else{
            res.status(200).json({status: "Success", data: data})
        }
    })
}

exports.UpdateTodo=(req, res)=>{
    let _id = req.body['_id']
    let TodoSubject = req.body['TodoSubject']
    let TodoDescription = req.body['TodoDescription']
    let TodoUpdateDate = Date.now()

    let PostBody = {
        TodoSubject: TodoSubject,
        TodoDescription : TodoDescription,
        TodoUpdateDate: TodoUpdateDate
    }

    ToDoListModel.updateOne({_id: _id},{$set:PostBody}, {upsert:true}, (err,data)=>{
        if(err){
            res.status(400).json({status:"Fail", data: err})
        }
        else{
            res.status(200).json({status: "Success", data: data})
        }
    })
}

exports.UpdateStatusTodo=(req, res)=>{
    let _id = req.body['_id']
    let TodoStatus = req.body['TodoStatus']
    let TodoUpdateDate = Date.now()

    let PostBody = {
        TodoStatus:TodoStatus,
        TodoUpdateDate: TodoUpdateDate
    }

    ToDoListModel.updateOne({_id:_id},{$set:PostBody}, {upsert:true}, (err,data)=>{
        if(err){
            res.status(400).json({status:"Fail", data: err})
        }
        else{
            res.status(200).json({status: "Success", data: data})
        }
    })
}

exports.RemoveTodo=(req, res)=>{
    let _id = req.body['_id']
    ToDoListModel.remove({_id:_id},(err,data)=>{
        if(err){
            res.status(400).json({status:"Fail", data: err})
        }
        else{
            res.status(200).json({status: "Success", data: data})
        }
    })
}