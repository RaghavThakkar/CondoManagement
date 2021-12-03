"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const parkingSchema = new Schema({
    userId: Number,
    parkingNumber: Number,
    fromTime: Date,
    toTime: Date,
    date: Date,
    firstName: String,
    lastName: String,
    email: String,
    phone: Number,
    originalAddress: String
}, {
    collection: "parking"
});
const Model = mongoose_1.default.model("Parking", parkingSchema);
exports.default = Model;
//# sourceMappingURL=parking.js.map