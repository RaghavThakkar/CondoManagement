"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const WorkOrderSchema = new Schema({
    order_Due: String,
    id: String,
    status: String,
    description: String,
    priority: String,
    userId: String,
    unit: String
}, {
    collection: "workorder"
});
const Model = mongoose_1.default.model("WorkOrder", WorkOrderSchema);
exports.default = Model;
//# sourceMappingURL=workorder.js.map