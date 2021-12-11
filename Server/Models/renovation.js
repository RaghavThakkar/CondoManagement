"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const RenovationSchema = new Schema({
    userId: String,
    type: String,
    startDate: String,
    endDate: String,
    status: String,
    created: String,
    description: String
}, {
    collection: "renovation"
});
const Model = mongoose_1.default.model("Renovation", RenovationSchema);
exports.default = Model;
//# sourceMappingURL=renovation.js.map