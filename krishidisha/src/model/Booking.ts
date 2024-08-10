import { time } from "console";
import mongoose, { Schema, Document } from "mongoose";


const BookingSchema = new Schema({
    email:
    {
        type: String,
        required: true
    },
    market_yard: {
        type: String,
        required: true
    },
    booking_date:
    {
        type: Date,
    },
    booking_timeslot: {
        type: Date,
    },
    goods_type: {
        type: String,
        required: true
    },
    quantity: {
        type: String,
        required: true
    },
    status: {
        type: String,
    }
});

const BookingModel = (mongoose.models.bookings) || mongoose.model("bookings", BookingSchema);

export default BookingModel;