import mongoose from "mongoose"

const { Schema } = mongoose;

const sessionSchema = new Schema({
    userId: String,
    role: String,
    username: String
})

const Session = mongoose.model("Session", sessionSchema)

export { Session }

