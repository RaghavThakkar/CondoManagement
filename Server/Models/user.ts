import mongoose, { PassportLocalSchema } from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    id: Number,
    firstName: String,
    lastName: String,
    type: String,
    emailAddress: String,
    phone: String,
    username: String,
    displayName: String,

    //add in field for user type
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

UserSchema.plugin(passportLocalMongoose);
const Model = mongoose.model("User", UserSchema as PassportLocalSchema);
declare global {
    export type UserDocument = mongoose.Document & {
        _id: String,       //*NOTE* - this id attribute is different than the UserSchema above. It is string instead of number. modify if issues occur.
        firstName: String,
    lastName: String,
    type: String,
    emailAddress: String,
    phone: String,
    username: String,
    displayName: String,
        
    }
}
export default Model;