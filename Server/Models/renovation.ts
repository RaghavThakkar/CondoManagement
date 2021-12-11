import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const RenovationSchema = new Schema({
    userId: String,
    type: String,
    startDate:String,
    endDate:String,
    status:String,
    created: String,
    description: String
}, {
    collection: "renovation"
});

const Model = mongoose.model("Renovation", RenovationSchema);
export default Model;