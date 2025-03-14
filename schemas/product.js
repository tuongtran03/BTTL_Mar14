let mongoose = require('mongoose');

let productSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
    },quantity:{
        type:Number,
        min:0,
        required:true
    },price:{
        type:Number,
        min:0,
        required:true
    },description:{
        type:String,
        default:""
    },imgURL:{
        type:String,
        default:""
    },category:{
        type:String,
        required:true
    }
},{
    timestamps:true
})
module.exports = mongoose.model('product',productSchema)
// Tao 1 schema cho obj category gồm name,description, timestamp