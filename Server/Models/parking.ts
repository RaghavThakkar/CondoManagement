import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const parkingSchema = new Schema({
    userId: String,
    parkingNumber: Number,
    fromTime: String,
    unit: String,
    toTime: String,
    date: String,
    firstName: String,
    lastName: String,
    email: String,
    phone: Number,
    originalAddress: String

}, {
    collection: "parking"
});

const Model = mongoose.model("Parking", parkingSchema);
export default Model;