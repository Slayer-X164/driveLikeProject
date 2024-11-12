const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        unique:true,
        minlength:[5,'username must be at least 5 characters long']
    },
    email:{
        type:String,
        required:true,
        minlength:[13,'email must be at least 13 characters long'],
        unique:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
        trim:true,
        minlength:[6,'password must be at least 6 characters long']
    }
})

const userModel = mongoose.model('userModel',userSchema)

module.exports = userModel