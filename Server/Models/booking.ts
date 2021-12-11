import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
    title: String,
    date: Date,
    content: String
}, {
    collection: "booking"
});

const Model = mongoose.model("Booking", bookingSchema);
export default Model;
// const bookingSchema = new Schema({
//     id: String,
//     userId: String,
//     date: String,
//     timeSlot: Number,
//     type: String,
//     status: String,
//     created: Date,
//     updated: Date

// }, {
//     collection: "booking"
// });

// const Model = mongoose.model("Booking", bookingSchema);
// export default Model;