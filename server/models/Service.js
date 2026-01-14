import mongoose from "mongoose";


const serviceSchema = new mongoose.Schema({
    image:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    isAvailable:{
        type:Boolean,
        default:true
    },
    duration:{
        type:String,
        required:true
    },

},{
    timestamps:true
})

const Service = mongoose.model("Service", serviceSchema);
export default Service;