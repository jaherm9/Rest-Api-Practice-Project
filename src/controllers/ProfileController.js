const ProfileModel = require("../models/ProfileModel");
let jwt = require('jsonwebtoken');
exports.CreateProfile=(req, res)=>{
    let reqBody=req.body;
    ProfileModel.create(reqBody, (err, data)=>{
        if(err){
            res.status(400).json({status:"Fail", data: err})
        }
        else{
            res.status(200).json({status: "Success", data: data})
        }

    })
}


// 112 User Login
// User Login
exports.UserLogin=(req, res)=> {
    let userName = req.body['userName'];
    let Password = req.body['Password'];
    ProfileModel.find({userName:userName, Password:Password}, (err,data)=>{
        if(err){
            res.status(400).json({status:"Fail", data: err})
        }
        else{
            if (data.length>0){

                //Create Auth Token
                let Payload ={exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60),data: data[0]}
                let token = jwt.sign(Payload,'SecretKey68669');

                res.status(200).json({status: "Success", token:token, data: data[0]})
            }
            else{
                res.status(401).json({status: "Unauthorized"})
            }
        }
    })
}


exports.SelectProfile=(req, res)=>{
    let userName = req.headers['username'];
    ProfileModel.find({userName:userName}, (err,data)=>{

        if(err){
            res.status(400).json({status:"Fail", data: err})
        }
        else{
            res.status(200).json({status: "Success", data: data})
        }
    })
}

exports.UpdateProfile=(req, res)=>{
    let userName = req.headers['username'];
    let reqBody=req.body;

    ProfileModel.updateOne({userName:userName},{$set:reqBody}, {upsert:true}, (err,data)=>{
        if(err){
            res.status(400).json({status:"Fail", data: err})
        }
        else{
            res.status(200).json({status: "Success", data: data})
        }
    })
}