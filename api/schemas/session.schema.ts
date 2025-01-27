import mongoose from "mongoose"

const { Schema } = mongoose;

const sessionSchema = new Schema({
    userId: { type: String, required: true },
    username: { type: String, required: true },
    deviceId: { type: String, required: true }
})

const Session = mongoose.model("Session", sessionSchema)

export { Session }

