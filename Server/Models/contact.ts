import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const ContactSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    phone: Number,
    description: String,
    userId: Number,
    created: Date
}, {
    collection: "contact"
});

const Model = mongoose.model("Contact", ContactSchema);
export default Model;