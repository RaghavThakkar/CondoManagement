"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const maintenanceSchema = new Schema({
    userId: Number,
}, {
    collection: "maintenance"
});
const Model = mongoose_1.default.model("Maintenance", maintenanceSchema);
exports.default = Model;
//# sourceMappingURL=maintenance.js.map