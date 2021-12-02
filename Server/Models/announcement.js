"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const AnnouncementSchema = new Schema({
    title: String,
    content: String
}, {
    collection: "announcements"
});
const Model = mongoose_1.default.model("Announcement", AnnouncementSchema);
exports.default = Model;
//# sourceMappingURL=announcement.js.map