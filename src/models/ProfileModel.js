const mongoose = require('mongoose');


const DataSchema = mongoose.Schema({
    firstName: {type: String},
    lastName: {type: String},
    EmailAddress: {type: String},
    mobileNumber: {type: String},
    City: {type: String},
    userName: {type: String, unique:true},
    Password: {type: String}

},{versionKey:false});

const ProfileModel = mongoose.model('Profile', DataSchema)

module.exports = ProfileModel