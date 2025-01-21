import mongoose from "mongoose"

const { Schema } = mongoose;

const sessionSchema = new Schema({
    userId: { type: String, required: true },
    role: { type: String, required: true },
    username: { type: String, required: true },
    featureList: { type: Array, required: true }
})

const Session = mongoose.model("Session", sessionSchema)

export { Session }

