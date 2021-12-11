import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const CondoSchema = new Schema({
    unitNumber: String ,
    userId: String,
    type:String,
    address: String,
    description: String
}, {
    collection: "condo"
});

const Model = mongoose.model("Condo", CondoSchema);
export default Model;