"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const bookingSchema = new Schema({
    title: String,
    date: Date,
    content: String
}, {
    collection: "booking"
});
const Model = mongoose_1.default.model("Booking", bookingSchema);
exports.default = Model;
//# sourceMappingURL=booking.js.map