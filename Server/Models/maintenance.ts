import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const ContactSchema = new Schema({
    userId: Number,
    
}, {
    collection: "contact"
});

const Model = mongoose.model("Contact", ContactSchema);
export default Model;