import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const parkingSchema = new Schema({
    userId: Number,
    parkingNumber: Number,
    fromTime: Date,
    toTime: Date,
    date: Date,
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