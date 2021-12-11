import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const maintenanceSchema = new Schema({
    firstName: String,
    lastName: String,
    type: String,
    unit:String,
    date:String,
    description:String,
    userId:String,
    workerId:String,
    status:String,
    created: {
        type: Date,
        default: Date.now()
    },
    updated: {
        type: Date,
        default: Date.now()
    }
    
}, {
    collection: "maintenance"
});

const Model = mongoose.model("Maintenance", maintenanceSchema);
export default Model;