import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
{
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", 
        required: true
    },

    service: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Service",
        required: true
    },
    phone:{
        type:String,
        required:true
    },

    bookingDate: {
        type: String,
        required: true
    },
    bookingTime:{
        type:String,
        requred:true
    },
     status: {
        type: String,
        enum: ["Pending", "Confirmed", "Cancelled"],
        default: "Pending"
    }
},
{ timestamps: true }
);

const Booking =  mongoose.model("Booking", bookingSchema);
export default Booking;