"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const BookingSchema = new Schema({
    id: String,
    userId: String,
    date: Date,
    timeSlot: Number,
    type: String,
    status: String,
    created: Date,
    updated: Date
}, {
    collection: "booking"
});
const Model = mongoose_1.default.model("Booking", BookingSchema);
exports.default = Model;
//# sourceMappingURL=booking.js.map