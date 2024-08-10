import mongoose, { Schema, Document } from "mongoose";

const UserSchema = new Schema({
    firstname:
    {
        type: String,
        required: true
    },
    lastname:
    {
        type: String,
        required: true
    },
    username:
    {
        type: String,
        required: true,
        unique: true
    },
    password:
    {
        type: String,
        required: true
    },
    mobile_number:
    {
        type: Number,
        required: false
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    registered_date: {
        type: Date,
        required: true,
        default: Date.now
    },
    token: {
        type: String,
        required: false
    }
});

const UserModel = (mongoose.models.users) || mongoose.model("users", UserSchema);

export default UserModel;