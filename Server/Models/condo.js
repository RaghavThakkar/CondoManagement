"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const CondoSchema = new Schema({
    unitNumber: Number,
    userId: Number,
    address: String,
    description: String
}, {
    collection: "condo"
});
const Model = mongoose_1.default.model("Condo", CondoSchema);
exports.default = Model;
//# sourceMappingURL=condo.js.map