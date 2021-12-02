import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const AnnouncementSchema = new Schema({
    title: String,
    content: String
}, {
    collection: "announcements"
});

const Model = mongoose.model("Announcement", AnnouncementSchema);
export default Model;