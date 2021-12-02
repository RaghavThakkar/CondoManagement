import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const RenovationSchema = new Schema({
    userId: Number,
    type: String,
    unitNumber: Number,
    created: Date,
    description: String
}, {
    collection: "renovation"
});

const Model = mongoose.model("Renovation", RenovationSchema);
export default Model;