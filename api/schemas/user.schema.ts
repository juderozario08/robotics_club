import mongoose from "mongoose"

const { Schema } = mongoose;

const userSchema = new Schema({
})

const User = mongoose.model("user", userSchema);

export { User }
