"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const passport_local_mongoose_1 = __importDefault(require("passport-local-mongoose"));
const Schema = mongoose_1.default.Schema;
const UserSchema = new Schema({
    id: Number,
    firstName: String,
    lastName: String,
    password: String,
    type: String,
    email: String,
    unit: String,
    city: String,
    province: String,
    street: String,
    zipcode: String,
    phone: String,
    username: String,
    displayName: String,
    created: {
        type: Date,
        default: Date.now()
    },
    updated: {
        type: Date,
        default: Date.now()
    }
}, {
    collection: "users"
});
UserSchema.plugin(passport_local_mongoose_1.default);
const Model = module.exports = mongoose_1.default.model("User", UserSchema);
exports.default = Model;
//# sourceMappingURL=user.js.map