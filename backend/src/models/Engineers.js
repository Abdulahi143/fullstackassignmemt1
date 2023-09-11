import mongoose from "mongoose";

const EngineerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    age: {
        type: Number,
        required: true
    },
    experienceYears: {
        type: Number, 
        required: true, 
        min: 0 
    },
    programmingLanguage: {
        type: String,
        enum: ["Java", "Python", "JavaScript", "C", "CSharp", "None_of_the_above"],
        required: true 
    },
    verified: {
        type: Boolean,
        default: false
    },
    appliedAt: {
        type: Date,
        default: Date.now
    }
});

const Engineer = mongoose.model("Engineer", EngineerSchema);

export default Engineer;
