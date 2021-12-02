import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const WorkOrderSchema = new Schema({
    order_Due: String,
    id: String,             //field type set as string (for simplicity).
    status: String,
    description: String,
    priority: String,
    assignee: String,
    unit: String
}, {
    collection: "work-order"
});

const Model = mongoose.model("WorkOrder", WorkOrderSchema);
export default Model;