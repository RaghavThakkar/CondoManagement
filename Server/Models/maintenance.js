"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const maintenanceSchema = new Schema({
    firstName: String,
    lastName: String,
    type: String,
    unit: String,
    date: String,
    description: String,
    userId: String,
    workerId: String,
    status: String,
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
const Model = mongoose_1.default.model("Maintenance", maintenanceSchema);
exports.default = Model;
//# sourceMappingURL=maintenance.js.map