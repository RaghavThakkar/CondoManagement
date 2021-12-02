import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const BookingSchema = new Schema({
    id: String,
    userId: String,
    date: Date,
    timeSlot: Date,
    type: String,
    status: String,
    created: Date,
    updated: Date

}, {
    collection: "booking"
});

const Model = mongoose.model("Booking", BookingSchema);
export default Model;