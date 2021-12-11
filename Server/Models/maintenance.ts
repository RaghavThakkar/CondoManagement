import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const maintenanceSchema = new Schema({
    userId: Number,
    
}, {
    collection: "maintenance"
});

const Model = mongoose.model("Maintenance", maintenanceSchema);
export default Model;