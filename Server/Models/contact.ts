import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const ContactSchema = new Schema({
    name: String,
    emailAddress: String,
    number: String
}, {
    collection: "contact"
});

const Model = mongoose.model("Contact", ContactSchema);
export default Model;