import mongoose, { Schema, Document } from "mongoose";

const schemeSchema = new Schema({
    schemeName: {
        type: String,
        required: true
    },
    schemeDescription: {
        type: String,
        required: true
    },
    schemeLink: {
        type: String,
        required: true
    },
    imageLink: {
        type: String,
        required: true
    }
})

const SchemeModel = (mongoose.models.schemes) || mongoose.model("schemes", schemeSchema);
export default SchemeModel;

