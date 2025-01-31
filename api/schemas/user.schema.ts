import mongoose from "mongoose"

const { Schema } = mongoose;

const userSchema = new Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: Number, required: true },
    features: { type: String, required: true }
})

const User = mongoose.model("user", userSchema);

export { User }
